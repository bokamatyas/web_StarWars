using AngleSharp.Dom;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
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


        [FindsBy(How = How.TagName, Using = "link")]
        public List<IWebElement> Link_list { get;}


        [FindsBy(How = How.Id, Using = "BTN_C_P")]
        public IWebElement Button_charPrev { get; set; }


        [FindsBy(How = How.Id, Using = "BTN_C_N")]
        public IWebElement Button_charNext { get; set; }


        [FindsBy(How = How.Id, Using = "BTN_V_P")]
        public IWebElement Button_vehiclePrev { get; set; }


        [FindsBy(How = How.Id, Using = "BTN_V_N")]
        public IWebElement Button_vehicleNext { get; set; }


        [FindsBy(How = How.Id, Using = "characters")]
        public IWebElement Container_characters { get; set; }


        [FindsBy(How = How.Id, Using = "vehicles")]
        public IWebElement Container_vehicles{ get; set; }


        [FindsBy(How = How.CssSelector, Using = "#characters > div:nth-child(2) > div")]
        public IWebElement Card_Click { get; set; }


        [FindsBy(How = How.Id, Using = "hider")]
        public IWebElement Card_Show { get; set; }



        public string ClickCharSliders()
        {
            Actions actions = new Actions(driver);
            actions.MoveToElement(Button_charNext).Click().Perform();
            Thread.Sleep(100);
            actions.MoveToElement(Button_charNext).Click().Perform();
            Thread.Sleep(100);
            actions.MoveToElement(Button_charPrev).Click().Perform();
            Thread.Sleep(100);
            return Container_characters.GetAttribute("style");
        }

        public string ClickVehicleSliders()
        {
            Actions actions = new Actions(driver);
            for (int i = 0; i <= 4; i++)
            {
                actions.MoveToElement(Button_vehicleNext).Click().Perform();
                Thread.Sleep(100);
            }            
            actions.MoveToElement(Button_vehiclePrev).Click().Perform();
            Thread.Sleep(100);
            return Container_vehicles.GetAttribute("style");
        }


        public void ClickOnImages()
        {
            Actions actions = new Actions(driver);
            actions.MoveToElement(Card_Click).Click().Perform();
            Thread.Sleep(3000);            
        }
    }
}
