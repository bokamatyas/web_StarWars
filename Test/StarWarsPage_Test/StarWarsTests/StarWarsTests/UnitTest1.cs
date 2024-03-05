using OpenQA.Selenium;
using StarWarsTests.pageObjects;
using StarWarsTests.utilities;

namespace StarWarsTests
{
    public class Tests : Base
    {   

        [Test, Order(1)]
        public void TestPageTitle()
        {
            try {
                Assert.That(MAINPAGE.Tag_title.GetAttribute("innerHTML"), Is.EqualTo("Return of the jedi"));
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }

        [Test, Order(2)]
        public void TestPageCssLink()
        {
            try
            {
                IWebElement? Link_Css = null;
                MAINPAGE.Link_list.ForEach(link =>
                {
                    if (link.GetAttribute("rel") == "stylesheet") { Link_Css = link; }
                });
                Assert.Multiple(() =>
                {
                    Assert.That(Link_Css, Is.Not.Null);
                    Assert.That(Link_Css.GetAttribute("href"), Is.EqualTo("./css/style.css"));
                });
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }

        [Test, Order(4)]
        public void TestPageSliders()
        {           
            try
            {
                Assert.Multiple(() =>
                {
                    Assert.That(MAINPAGE.ClickCharSliders(), Is.EqualTo("top: -350px;"));
                    Assert.That(MAINPAGE.ClickVehicleSliders(), Is.EqualTo("top: -1400px;"));
                });
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }
    }
}