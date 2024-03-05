using OpenQA.Selenium;
using StarWarsTests.pageObjects;
using StarWarsTests.utilities;

namespace StarWarsTests
{
    public class Tests : Base
    {       

        [Test, Order(1)]
        public void Test()
        {
            Assert.That(MAINPAGE.Tag_title.GetAttribute("innerHTML"), Is.EqualTo("Return of the jedi"));
        }

        [Test, Order(2)]
        public void TestScript() 
        {
            IWebElement? _script = null;
            foreach (IWebElement script in MAINPAGE.Tag_script)
            {
                if (script.GetAttribute("src").Contains("js/script.js"))
                {
                    _script = script;
                }
            }
            Assert.That(_script.GetAttribute("src"), Is.EqualTo("https://bokamatyas.github.io/web_StarWars/js/script.js"));

        }


    }
}