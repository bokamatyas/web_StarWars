using OpenQA.Selenium;
using SeleniumExtras.PageObjects;

namespace StarWarsTests.pageObjects
{
    public class mainPage
    {
        IWebDriver driver;
        public mainPage(IWebDriver _driver)
        {
            this.driver = _driver;
            PageFactory.InitElements(this.driver, this);
        }

        [FindsBy(How = How.TagName, Using = "title")]
        public IWebElement Tag_title { get; set; }

        [FindsBy(How = How.TagName, Using = "script")]

        public IList<IWebElement> Tag_script { get; set; }

        [FindsBy(How = )]
    }
}
