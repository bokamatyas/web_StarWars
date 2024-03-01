using OpenQA.Selenium;
using SeleniumExtras.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarWarsTests.pageObjects
{
    class mainPage
    {
        IWebDriver driver;
        public mainPage(IWebDriver _driver)
        {
            this.driver = _driver;
            PageFactory.InitElements(this.driver, this);
        }


    }
}
