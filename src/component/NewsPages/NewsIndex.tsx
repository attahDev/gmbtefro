import NewsletterSignup from "../LandingPages/NewsLetterSignup"
import PartnersSection from "../PartnersPage/PartnersSection"
import NewsArchiveSection from "./NewsArchiveSection"
import NewsHeroSection from "./NewsHeroSection"

export const NewsIndex = () => {
  return (
    <>
      <NewsHeroSection />
      <NewsArchiveSection />
      <NewsletterSignup />
      <PartnersSection />
    </>
  )
}
