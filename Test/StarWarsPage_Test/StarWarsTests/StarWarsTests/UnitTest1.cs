using OpenQA.Selenium;
using StarWarsTests.pageObjects;
using StarWarsTests.utilities;

namespace StarWarsTests
{
    public class Tests : Base
    {   
        //Dominik
        [Test, Order(1)]
        public void TestPageTitle()
        {
            Assert.That(MAINPAGE.Tag_title.GetAttribute("innerHTML"), Is.EqualTo("Return of the jedi"));
            try {
                Assert.That(MAINPAGE.Tag_title.GetAttribute("innerHTML"), Is.EqualTo("Return of the jedi"));
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }

        //M�ty�s
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
        
        //Dominik
        [Test, Order(3)]
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

        //M�ty�s
        [Test, Order(4)]
        public void TestPageSliders()
        {           
            try
            {
                Assert.Multiple(() =>
                {
                    Assert.That(MAINPAGE.ClickCharSliders(), Is.EqualTo("top: -350px;"));
                    Assert.That(MAINPAGE.ClickVehicleSliders(), Is.EqualTo("top: -350px;"));
                });
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }
        
         //Dominik
        [Test, Order(5)]

        public void TestCharacterDivPosition()
        {
            MAINPAGE.ClickCharSliders();

            try
            {
                Assert.That(MAINPAGE.Container_characters.GetAttribute("id"), Is.EqualTo("characters"));
            }
            catch (Exception ex)
            {
                TestContext.WriteLine("Nincsenek a div-ben a karakterek k�pei!");
            }
        }
        
        //Dominik
        [Test, Order(6)]
        public void TestVehicleDivPosition()
        {
            MAINPAGE.ClickVehicleSliders();

            try
            {
                Assert.That(MAINPAGE.Container_vehicles.GetAttribute("id"), Is.EqualTo("vehicles"));
            }
            catch (Exception ex)
            {
                TestContext.WriteLine("Nincsenek a div-ben a j�rm�vek k�pei!");
            }
        }
        
        //Dominik
        [Test, Order(7)]
        public void TestContentChangeOnPageResize()
        {
            try
            {
                string[] results = MAINPAGE.ResizeWindow();
                Assert.Multiple(() =>
                {
                    Assert.That(results[0], Is.EqualTo("top: 0px;"));
                    Assert.That(results[1], Is.EqualTo("top: 0px;"));
                });
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }
        
        //Dominik
        [Test, Order(8)]

        public void TestShowCardDetails()
        {
            MAINPAGE.ClickOnImages();

            try
            {
                Assert.That(MAINPAGE.Card_Show.GetAttribute("style"), Is.EqualTo("display: block;"));
            } catch (Exception ex)
            {
                TestContext.WriteLine("Nem jelenik meg az inform�ci�s fel�let!");
            }
        }
        
        // Mátyás
        [Test, Order(9)]
        public void TestCountofLinearGradientClasses()
        {
            try
            {
                Thread.Sleep(2000);
                Assert.That(MAINPAGE.GetAllLinearGradientClasses(), Is.EqualTo(7));
            }
            catch (Exception ex) { TestContext.WriteLine(ex.ToString()); }
        }                                       
    }
}