using StarWarsTests.pageObjects;
using StarWarsTests.utilities;

namespace StarWarsTests
{
    public class Tests : Base
    {       

        [Test, Order(1)]
        public void TestPageTitle()
        {
            mainPage MAINPAGE = new mainPage(driver);
            Assert.That(MAINPAGE.Tag_title.GetAttribute("innerHTML"), Is.EqualTo("Return of the jedi"));
        }
    }
}