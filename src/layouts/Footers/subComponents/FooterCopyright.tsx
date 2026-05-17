import { getCurrentYear } from "@/components/Utils/getCurrentYear";
import WhatsAppButton from "@/components/UI/WhatsAppButton";
import { FooterSocialLinks } from "@/components/UI/SocialLinks";

export default function FooterCopyright() {
  return (
    <div className="tp-footer-copyright-ptb pt-20 pb-20">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="tp-footer-copyright">
            <p>© {getCurrentYear()} Property La. All rights reserved.</p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="tp-footer-copyright d-flex justify-content-end align-items-center gap-3">
            <WhatsAppButton
              phoneNumber="601126368426"
              message="Hi, I'm interested in a property on PropertyLa"
            />
            <FooterSocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
