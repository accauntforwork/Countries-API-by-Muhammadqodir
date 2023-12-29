const root = document.querySelector(":root");
const body = document.querySelector("body");
const home = document.getElementById("home");
const main = document.getElementById("main");
const theme = document.getElementById("theme");
const modeName = document.querySelector(".mode-name");
const searchBar = document.getElementById("search-bar");
const countryName = document.getElementsByClassName("country-name");
const moon = document.getElementById("moon");
const menu = document.getElementById("menu");
const searchIcon = document.getElementById("search-icon");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const countryContainer = document.getElementsByClassName("country");
const options = document.querySelector(".options");
const regions = document.getElementsByClassName("region");
const backBtn = document.getElementById("back-btn");
const arrow = document.getElementById("arrow");
const loading = document.querySelector(".loading");

const countryPage = document.getElementById("country-page");
const bigFlag = document.getElementById("big-flag");
const cn = document.getElementById("cn");
const col1Span = document.getElementsByClassName("col-1-span");
const col2Span = document.getElementsByClassName("col-2-span");
const borderCountries = document.getElementById("border-countries");
const borders = document.getElementsByClassName("border");

let countries = [];

async function fetchData() {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();

    countries = data;
    loading.innerHTML = "";

    // fetch("https://restcountries.com/v2/all")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     countries = data;
    //     loading.innerHTML = "";
    countries.forEach((country) => {
      // bitta davlatni html cardini chizib olish
      main.innerHTML += `<div class="country text-left">
        <div class="flag-container"><img class="flag" src=${country.flag}></div>
        <div class="country-details">
          <h2 class="country-name">${country.name}</h2>
          <span class="font-bigger"><b>Population: </b>${country.population}</span>
          <span class="font-bigger"><b>Region: </b>${country.region}</span>
          <span class="font-bigger"><b>Capital: </b>${country.capital}</span>
        </div>
      </div>`;
    });
    for (let i = 0; i < data.length; i++) {
      let item = countryContainer[i];
      let country = data[i];

      item.addEventListener("click", () => {
        displayCountry(country);
      });

      // davlat haqidagi umumiy ma'lumotni chizish
      function displayCountry(country) {
        // bosilgan davlatni chiqarish
        home.style.overflowY = "hidden";
        home.style.display = "none";
        countryPage.style.transform = "translateX(0)";
        countryPage.scrollTop = 0;

        let currencyString = "";
        country.currencies.forEach((currency) => {
          currencyString += currency.name + ", ";
        });
        currencyString = currencyString.substr(0, currencyString.length - 2);
        let languageString = "";
        country.languages.forEach((language) => {
          languageString += language.name + ", ";
        });
        languageString = languageString.substr(0, languageString.length - 2);

        // parametrlarni o'rnatish
        bigFlag.src = country.flag;
        cn.innerText = country.name;
        col1Span[0].innerHTML = `<b>Native Name: </b>${country.nativeName}`;
        col1Span[1].innerHTML = `<b>Population: </b>${country.population}`;
        col1Span[2].innerHTML = `<b>Region: </b>${country.region}`;
        col1Span[3].innerHTML = `<b>Sub Region: </b>${country.subregion}`;
        col1Span[4].innerHTML = `<b>Capital: </b>${country.capital}`;

        col2Span[0].innerHTML = `<b>Top Level Domain: </b>${country.topLevelDomain}`;
        col2Span[1].innerHTML = `<b>Currencies: </b>${currencyString}`;
        col2Span[2].innerHTML = `<b>Languages: </b>${languageString}`;

        // chegaradosh davlatlarni o'rnatish
        let borderCountriesString = [];
        if (country.borders) {
          country.borders.forEach((border) => {
            borderCountriesString.push(
              countries.find((item) => item.alpha3Code === border).name
            );
          });
        }
        let border = "";
        borderCountriesString.forEach(
          (item) => (border += `<span class="border">${item}</span>`)
        );
        borderCountries.innerHTML = `<b style="min-width: 15ch">Border Countries: </b><div>${border}</div>`;
        for (let j = 0; j < borders.length; j++) {
          borders[j].addEventListener("click", () => {
            let country = countries.find((e) => e.name == borders[j].innerText);
            displayCountry(country);
          });
        }
      }
    }

    // qidirish qidiruvda ishtirok etmagan hafrli davlarlarni kardini ko'rinmaydigan qilish
    search.addEventListener("input", () => {
      countries.forEach((country, j) => {
        if (!country.name.toLowerCase().includes(search.value.toLowerCase())) {
          countryContainer[j].style.display = "none";
        } else {
          countryContainer[j].style.display = "unset";
        }
      });
    });
    // region tanlash
    for (let i = 0; i < regions.length; i++) {
      const reg = regions[i];
      reg.addEventListener("click", () => {
        countries.forEach((country, j) => {
          if (reg.getAttribute("data-value").toLowerCase() === "all") {
            countries.forEach((country, j) => {
              countryContainer[j].style.display = "unset";
            });
          } else if (
            country.region.toLowerCase() !==
            reg.getAttribute("data-value").toLowerCase()
          ) {
            countryContainer[j].style.display = "none";
          } else {
            countryContainer[j].style.display = "unset";
          }
        });
      });
    }
  } catch {
    console.error("Error fetching data:", error);
  }
}
fetchData();

// ma'umotlarni local storagedan olish
let mode = localStorage.getItem("mode");

theme.addEventListener("click", () => {
  if (mode === "dark") {
    // ma'umotlarni local storagega o'rnatish
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
  mode = localStorage.getItem("mode");
  changeTheme();
});
// themani o'zgartirish
function changeTheme() {
  if (mode === "dark") {
    root.style.setProperty("--bg", "#202c37");
    root.style.setProperty("--text", "#ffffff");
    root.style.setProperty("--lbg", "#2b3945");
    moon.src = "icons/moon-regular.svg";
    modeName.textContent = "Light mode";
    searchIcon.src = "icons/search-regular.svg";
    arrow.src = "icons/arrow-left-regular.svg";
  } else {
    root.style.setProperty("--bg", "#fafafa");
    root.style.setProperty("--text", "#111517");
    root.style.setProperty("--lbg", "#ffffff");
    moon.src = "icons/moon-solid.svg";
    modeName.textContent = "Dark mode";
    searchIcon.src = "icons/search-solid.svg";
    arrow.src = "icons/arrow-left-solid.svg";
  }
}
// dropdown menyu ochish yopish
filter.addEventListener("click", () => {
  options.classList.toggle("options-opened");
});

let scroll = document.documentElement.scrollTop;
// orqaga qaytganda homeni ko'rsatish
home.style.overflowY = "visible";
document.addEventListener("scroll", () => {
  if (home.style.overflowY === "visible") {
    scroll = document.documentElement.scrollTop;
  }
});

backBtn.addEventListener("click", () => {
  home.style.display = "block";
  home.style.overflowY = "visible";
  document.documentElement.scrollTop = scroll;
  countryPage.style.transform = "translateX(100%)";
});

changeTheme();
