﻿using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDriverManager.DriverConfigs.Impl;
using System.Configuration;

namespace StarWarsTests.utilities
{
    class Base
    {
        public IWebDriver driver;
        [SetUp]
        public void StartBrowser()
        {
            new WebDriverManager.DriverManager().SetUpDriver(new ChromeConfig());
            driver = new ChromeDriver();

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);

            driver.Manage().Window.Maximize();
            string? actUrl = ConfigurationManager.AppSettings["Url"];

            driver.Url = actUrl;

        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            driver.Dispose();

        }
    }
}
