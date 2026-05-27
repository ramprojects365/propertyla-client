"use client";

import { useEffect, useState } from "react";
import { ElementType } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bot,
  Check,
  Home,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  WandSparkles,
  Wallet,
  X,
} from "lucide-react";
import {
  ADVISOR_PROGRESS_KEY,
  ADVISOR_RESULTS_KEY,
  AdvisorAnswers,
  AdvisorContact,
} from "./advisor-utils";
import { createOrLoginPropertyFitLead } from "@/services/propertyService";
import "./guided-property-advisor.scss";

type AdvisorStep = keyof AdvisorAnswers;
type AdvisorFlowStep = AdvisorStep | "contact";

const isAdvisorAnswerStep = (key: AdvisorFlowStep): key is AdvisorStep =>
  key !== "contact";

const initialAnswers: AdvisorAnswers = {
  intent: "",
  location: "",
  budgetRange: "",
  budgetAmount: "",
  bedrooms: "",
};

const initialContact: AdvisorContact = {
  name: "",
  phone: "",
  email: "",
};

const steps: Array<{
  key: AdvisorFlowStep;
  eyebrow: string;
  question: string;
  helper: string;
  icon: ElementType;
}> = [
  {
    key: "intent",
    eyebrow: "Start with your goal",
    question: "Are you looking to rent or buy?",
    helper:
      "This helps us tune the recommendations around monthly comfort or purchase budget.",
    icon: Home,
  },
  {
    key: "location",
    eyebrow: "Preferred location",
    question: "Which location should we search?",
    helper: "Type a city, township, area, or project name.",
    icon: MapPin,
  },
  {
    key: "budgetAmount",
    eyebrow: "Price comfort",
    question: "What is your max price?",
    helper: "For rent, enter monthly budget. For buy, enter purchase budget.",
    icon: Wallet,
  },
  {
    key: "contact",
    eyebrow: "Save your search",
    question: "Where should we send better matches?",
    helper:
      "This is only a UI simulation for now. Later we will save this and notify agents.",
    icon: Phone,
  },
  {
    key: "bedrooms",
    eyebrow: "Space needs",
    question: "How many rooms do you need?",
    helper: "Enter the minimum bedroom count you want.",
    icon: BedDouble,
  },
];

const options: Partial<Record<AdvisorStep, string[]>> = {
  intent: ["buy", "rent"],
};

const answerLabels: Record<AdvisorStep, string> = {
  intent: "Goal",
  location: "Location",
  budgetRange: "Budget",
  budgetAmount: "Max price",
  bedrooms: "Bedrooms",
};

const inputConfig: Partial<Record<AdvisorStep, {
  type: string;
  placeholder: string;
  prefix?: string;
  min?: string;
}>> = {
  location: {
    type: "text",
    placeholder: "Example: Kuala Lumpur, Cheras, Puchong",
  },
  budgetAmount: {
    type: "number",
    placeholder: "Example: 2500 or 650000",
    prefix: "RM",
    min: "0",
  },
  bedrooms: {
    type: "number",
    placeholder: "Example: 3",
    min: "0",
  },
};

const locationSuggestions = ["Kuala Lumpur", "Selangor", "Cheras", "Puchong"];
const bedroomSuggestions = ["1", "2", "3", "4"];

const getInputSuggestions = (
  key: AdvisorStep,
  intent: AdvisorAnswers["intent"],
): string[] => {
  if (key === "location") return locationSuggestions;
  if (key === "bedrooms") return bedroomSuggestions;
  if (key === "budgetAmount") {
    return intent === "rent"
      ? ["1500", "2500", "3500", "5000"]
      : ["500000", "800000", "1200000", "2000000"];
  }

  return [];
};

interface GuidedPropertyAdvisorProps {
  popupMode?: boolean;
  onCancel?: () => void;
}

export default function GuidedPropertyAdvisor({
  popupMode = false,
  onCancel,
}: GuidedPropertyAdvisorProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<AdvisorAnswers>(initialAnswers);
  const [contact, setContact] = useState<AdvisorContact>(initialContact);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");
  const [showReminder, setShowReminder] = useState(false);

  const step = steps[currentStep];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  const completedCount = Object.values(answers).filter(Boolean).length;
  const contactCompleted = Boolean(contact.phone || contact.email);
  const flowCompletedCount = completedCount + (contactCompleted ? 1 : 0);
  const autoRegisterReady = Boolean(contact.name && contact.phone && contact.email);
  const answerStep = isAdvisorAnswerStep(step.key) ? step.key : null;
  const currentInput = answerStep ? inputConfig[answerStep] : undefined;
  const inputSuggestions = answerStep
    ? getInputSuggestions(answerStep, answers.intent)
    : [];
  const canContinue =
    step.key === "contact" ? contactCompleted : Boolean(answerStep && answers[answerStep]);
  const isLastStep = currentStep === steps.length - 1;
  const StepIcon = step.icon;

  useEffect(() => {
    const saved = window.localStorage.getItem(ADVISOR_PROGRESS_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        answers?: AdvisorAnswers;
        contact?: AdvisorContact;
        currentStep?: number;
      };

      if (parsed.answers) setAnswers(parsed.answers);
      if (parsed.contact) setContact(parsed.contact);
      if (typeof parsed.currentStep === "number") {
        setCurrentStep(Math.min(parsed.currentStep, steps.length - 1));
      }
      setShowReminder(true);
    } catch {
      window.localStorage.removeItem(ADVISOR_PROGRESS_KEY);
    }
  }, []);

  useEffect(() => {
    const hasProgress =
      Object.values(answers).some(Boolean) ||
      Object.values(contact).some(Boolean) ||
      currentStep > 0;

    if (!hasProgress || loading) return;

    window.localStorage.setItem(
      ADVISOR_PROGRESS_KEY,
      JSON.stringify({ answers, contact, currentStep }),
    );
  }, [answers, contact, currentStep, loading]);

  const selectAnswer = (key: AdvisorStep, value: string) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const saveAuthFromResponse = (response: any) => {
    const auth = response?.data?.auth || response?.auth;
    const user = auth?.user;
    const token = auth?.token;

    if (!token || !user) return false;

    localStorage.setItem("authToken", token);
    localStorage.setItem("loginUser", user.username || user.email || "");
    localStorage.setItem(
      "loginUserDisplayName",
      user.fullName || user.username || user.email || "",
    );
    window.dispatchEvent(new Event("propertyla-auth-changed"));
    return true;
  };

  const createLeadLogin = async () => {
    if (!autoRegisterReady) return true;

    setLeadLoading(true);
    setLeadMessage("");

    try {
      const response = await createOrLoginPropertyFitLead(contact);
      const loggedIn = saveAuthFromResponse(response);
      setLeadMessage(
        loggedIn
          ? "You are logged in with a default PropertyLa lead account."
          : "Lead saved. Please sign in if this email already has an account.",
      );
      return true;
    } catch (error: any) {
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;
      const endpointMissing = status === 404;
      const networkError = !error?.response;

      if (status === 409) {
        setLeadMessage(
          "This email already has an account. We will continue to results; sign in later to manage the account.",
        );
        return true;
      }

      setLeadMessage(
        serverMessage ||
          (endpointMissing
            ? "Auto-login backend route is not available yet. Please restart the backend with the latest build."
            : networkError
              ? "Auto-login backend is not reachable. Please make sure the backend is running."
              : "We could not auto-login right now. Please try again."),
      );
      return false;
    } finally {
      setLeadLoading(false);
    }
  };

  const handleNext = async () => {
    if (!canContinue) return;

    if (step.key === "contact") {
      const leadReady = await createLeadLogin();
      if (!leadReady) return;
    }

    setCurrentStep((index) => Math.min(index + 1, steps.length - 1));
  };

  const handleFindMatches = async () => {
    if (autoRegisterReady && !localStorage.getItem("authToken")) {
      const leadReady = await createLeadLogin();
      if (!leadReady) return;
    }

    setLoading(true);
    window.localStorage.removeItem(ADVISOR_PROGRESS_KEY);
    setShowReminder(false);

    window.setTimeout(() => {
      window.localStorage.setItem(
        ADVISOR_RESULTS_KEY,
        JSON.stringify({
          answers,
          contact,
          autoRegisterReady,
          createdAt: new Date().toISOString(),
        }),
      );
      router.push("/property-fit");
    }, 650);
  };

  return (
    <main className={`guided-advisor ${popupMode ? "guided-advisor--popup" : ""}`}>
      {popupMode && onCancel && (
        <button
          type="button"
          className="guided-advisor__cancel"
          onClick={onCancel}
          aria-label="Cancel advisor"
        >
          <X size={18} />
          Cancel
        </button>
      )}

      <section className="guided-advisor__intro">
        <span className="guided-advisor__badge">
          <Sparkles size={16} />
          AI-style Guided Property Advisor
        </span>
        <h1>Let PropertyLa guide you to a better-fit home.</h1>
        <p>
          A warmer, step-by-step experience that feels like a property concierge, not
          another basic search form.
        </p>
        <div className="guided-advisor__ai-strip">
          <span>
            <Bot size={16} /> Smart brief
          </span>
          <span>
            <WandSparkles size={16} /> Match reasons
          </span>
          <span>
            <MessageCircle size={16} /> Agent fallback
          </span>
        </div>
      </section>

      <section className="guided-advisor__app">
        <div className="guided-advisor__progress">
          <div>
            <strong>{progress}%</strong>
            <span>{flowCompletedCount} of {steps.length} answers selected</span>
          </div>
          <i>
            <b style={{ width: `${progress}%` }} />
          </i>
        </div>

        <div className="guided-advisor__question">
          <div className="guided-advisor__assistant-bubble">
            <span>
              <Bot size={18} />
            </span>
            <p>
              {currentStep === 0 &&
                "Great, let us shape your search from the goal first."}
              {currentStep === 1 &&
                "Now I will use your typed location to search real listings."}
              {currentStep === 2 &&
                "Your own price number keeps the results realistic for rent or buy."}
              {step.key === "contact" &&
                "Before I show matches, I can keep this search ready for follow-up."}
              {step.key === "bedrooms" &&
                "Last step. Space needs can change the whole shortlist."}
            </p>
          </div>

          <div className="guided-advisor__question-head">
            <span>
              <StepIcon size={18} />
            </span>
            <div>
              <p>{step.eyebrow}</p>
              <h2>{step.question}</h2>
              <small>{step.helper}</small>
            </div>
          </div>

          {!answerStep ? (
            <div className="guided-advisor__contact-form">
              <label>
                Name
                <input
                  type="text"
                  value={contact.name}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Your name"
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="+60"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={contact.email}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="you@example.com"
                />
              </label>
              <p>
                {autoRegisterReady
                  ? "Name, phone, and email will create a default lead account and log you in."
                  : "Add name, phone, and email to auto-register and log in."}
              </p>
              {leadMessage && (
                <p className="guided-advisor__lead-message">{leadMessage}</p>
              )}
            </div>
          ) : currentInput ? (
            <div className="guided-advisor__typed-answer">
              <label>
                {answerLabels[answerStep]}
                <div className="guided-advisor__typed-row">
                  <div className="guided-advisor__typed-control">
                    {currentInput.prefix && <span>{currentInput.prefix}</span>}
                    <input
                      type={currentInput.type}
                      min={currentInput.min}
                      value={answers[answerStep]}
                      onChange={(event) => selectAnswer(answerStep, event.target.value)}
                      placeholder={currentInput.placeholder}
                    />
                  </div>
                  <div className="guided-advisor__input-options">
                    {inputSuggestions.map((suggestion) => (
                      <button
                        type="button"
                        key={suggestion}
                        className={answers[answerStep] === suggestion ? "is-selected" : ""}
                        onClick={() => selectAnswer(answerStep, suggestion)}
                      >
                        {answerStep === "budgetAmount" ? `RM ${Number(suggestion).toLocaleString()}` : suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="guided-advisor__options">
              {(options[answerStep] || []).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={answers[answerStep] === option ? "is-selected" : ""}
                  onClick={() => selectAnswer(answerStep, option)}
                >
                  <span>{option}</span>
                  {answers[answerStep] === option && <Check size={18} />}
                </button>
              ))}
            </div>
          )}

          <div className="guided-advisor__nav">
            <button
              type="button"
              onClick={() => setCurrentStep((index) => Math.max(index - 1, 0))}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            {!isLastStep ? (
              <button
                type="button"
                className="primary"
                onClick={handleNext}
                disabled={!canContinue || leadLoading}
              >
                {leadLoading ? "Saving..." : "Next"}
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="primary"
                onClick={handleFindMatches}
                disabled={flowCompletedCount < steps.length || loading}
              >
                {loading ? (
                  <Loader2 className="guided-advisor__spin" size={16} />
                ) : (
                  <Search size={16} />
                )}
                Find matching properties
              </button>
            )}
          </div>
        </div>

        <aside className="guided-advisor__summary">
          <div className="guided-advisor__score-ring">
            <span>{flowCompletedCount}/{steps.length}</span>
            <small>Brief strength</small>
          </div>
          <h3>Your search brief</h3>
          {steps.map((item) => (
            <div
              key={item.key}
              className={
                isAdvisorAnswerStep(item.key)
                  ? answers[item.key]
                    ? "is-filled"
                    : ""
                  : contactCompleted
                    ? "is-filled"
                    : ""
              }
            >
              <span>{isAdvisorAnswerStep(item.key) ? answerLabels[item.key] : "Contact"}</span>
              <strong>
                {isAdvisorAnswerStep(item.key)
                  ? answers[item.key] || "Not selected yet"
                  : autoRegisterReady
                    ? "Ready for auto-register"
                    : contactCompleted
                      ? contact.phone || contact.email
                      : "Not provided yet"}
              </strong>
            </div>
          ))}
        </aside>
      </section>

      {showReminder && !loading && (
        <button
          type="button"
          className="guided-advisor__resume"
          onClick={() => setShowReminder(false)}
        >
          <MessageCircle size={17} />
          Continue your property advisor
        </button>
      )}

      {loading && (
        <div
          className="guided-advisor__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Preparing property fit results"
        >
          <div className="guided-advisor__modal-backdrop" />
          <div className="guided-advisor__modal-panel">
            <div className="guided-advisor__modal-loading">
              <div className="guided-advisor__modal-visual">
                <div className="guided-advisor__modal-orbit">
                  <Loader2 className="guided-advisor__spin" size={34} />
                </div>
                <div className="guided-advisor__modal-card guided-advisor__modal-card--one">
                  <Home size={15} />
                  Match brief
                </div>
                <div className="guided-advisor__modal-card guided-advisor__modal-card--two">
                  <MapPin size={15} />
                  Check projects
                </div>
              </div>
              <span>AI-style matching in progress</span>
              <h2>Preparing your property fit page</h2>
              <p>Checking your budget, rooms, and preferred location against active PropertyLa projects.</p>
              <div className="guided-advisor__modal-steps">
                <span>Brief saved</span>
                <span>Lead ready</span>
                <span>Agent fallback</span>
              </div>
              <div className="guided-advisor__thinking">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
