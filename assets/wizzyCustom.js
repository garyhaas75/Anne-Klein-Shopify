function checkWizzyfiltersApplied(url) {
  const hasCollections = url.includes("/collections");
  const hasAppliedFilters = url.includes("[]");
  return hasCollections && hasAppliedFilters;
}
const colorMap = new Map([
  ["Black", "#000"],
  ["Grey", "#8c8c8c"],
  ["Gold", "#FFD700"],
  ["Silver", "#c1c1c1"],
  ["Rose Gold", "#FFD395"],
  ["White", "#f6f5ee"],
  ["Red", "#cc504f"],
  ["Green", "#339859"],
  ["Blue", "#4e7eb2"],
  ["Brown", "#93755b"],
  ["Cream", "#fffdd0"],
  ["Yellow", "#eebc3c"], 
  ["Pink", "#edabba"],
  ["Multicolor", "TRANSPARENT"],
  ["Orange", "#eeb377"],
  ["Purple", "#876cb5"],
]);
const availableSizeStrings =  [
  "XXS/XS", "XXS/XS", "XS/S", "S/M", "M/L", "L/XL", "XXS", "XS", "S", "M", "L", "XL", "XXL",
  "0", "2", "4", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11",
  "12", "14", "16", "18", "0X", "1X", "2X", "3X", "5W", "6W", "6.5W", "7W", "7.5W", "8W", "8.5W",
  "9W", "9.5W", "10W", "14W", "16W", "18W", "20W", "22W", "24W", "26W", "2P", "4P", "6P", "8P",
  "10P", "12P", "14P", "16P", "PXXS", "PXS", "PS", "PM", "PL", "PXL", "PXXL"
];

const availableShoeSizeStrings = [
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "5W",
  "6W",
  "6.5W",
  "7W",
  "7.5W",
  "8W",
  "8.5W",
  "9W",
  "9.5W",
  "10W",
];
if (window.innerWidth > 768) {
  window.addEventListener("scroll", function () {
    var autoCompleteWrapper = document.querySelector(
      ".wizzy-autocomplete-wrapper"
    );

    if (autoCompleteWrapper) {
      var searchBar =
        window.scrollY > 0
          ? document.querySelector(
              "#header .header__icons--sticky .search_input"
            )
          : document.querySelector(
              "#header .header__icon__normal .search_input"
            );

      if (searchBar) {
        var positionInfo = searchBar.getBoundingClientRect();

        var top = positionInfo.top + positionInfo.height;
        autoCompleteWrapper.style.setProperty("top", top + "px", "important");
      }
    }
  });
}

const observer = new MutationObserver(() => {
  const isOverlayOpen = document.querySelector(
    ".wizzy-overlay-opened.wizzy-filters-overlay .wizzy-search-wrapper .wizzy-search-results-wrapper .wizzy-search-filters-left"
  );

  const chatIframe = document.getElementById("chat-button");
  if (chatIframe) {
    chatIframe.style.display = isOverlayOpen ? "none" : "block";
  }
});

// Watch the body for class changes
observer.observe(document.body, {
  attributes: true,
  subtree: true,
  attributeFilter: ["class"],
});


function findHaxCode(key) {
  return colorMap.has(key) ? colorMap.get(key) : [key, false];
}
// function findHaxCode(key) {
//   return varientMapper[key] ? [varientMapper[key], true] : [key, false];
// }
if (window.innerWidth <= 768) {
  var searchIconMobile = document.querySelector(
    ".mobile-header .header__link.action-area__link"
  );

  if (searchIconMobile) {
    // console.log("Search Icon",searchIconMobile);
    searchIconMobile.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log("ICON CLICK");

      var searchPopup = document.querySelector("#search_mini_form");

      var searchInput = document.querySelector("#search_mini_form #searchInput");

      if (searchPopup && searchInput) {
        searchPopup.style.display = "block";
        searchInput.click();
      }
    });
  }

  var searchBackIcon = document.querySelector(".wizzy-search-back");

  if (searchBackIcon) {
    searchBackIcon.addEventListener("click", function (event) {
      var searchPopup = document.querySelector("#search_mini_form");

      if (searchPopup) {
        searchPopup.style.display = "none";
      }
    });
  }
}

window.onWizzyScriptLoaded = function () {
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_LAZY_INIT,
    function (data) {
      if (window.wizzyConfig.common.isOnCategoryPage) {
        data.common.lazyDOMConfig.contentDOMIdentifiers = [
          "#wizzy-shopify-collection-page-wrapper",
        ];
      } else {
        data.common.lazyDOMConfig.contentDOMIdentifiers = ["#main-content"];
      }
      data.search.configs.general.noOfProducts = 48;
      window.wizzyConfig.search.configs.pagination.type = "numbered";
      data.endpoints.common = "https://uranus-api.wizsearch.in";
      
      data.filters.configs.keepOpenedInMobileAfterApply = true;
      window.wizzyConfig.search.configs.pagination.infiniteScrollOffset = {
        desktop: 5000,
        mobile: 3000,
      };

      return data;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents
      .BEFORE_AUTOCOMPLETE_SUGGESTIONS_RENDER,
    function (data) {
      setTimeout(() => {
        const headItem = document.querySelector(
          '.autocomplete-item-head[data-index="0"]'
        );

        if (headItem && headItem.textContent.trim() === "Categories") {
          headItem.textContent = "COLLECTIONS";
        }
      }, 0);

      return data;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_SEARCH_EXECUTED,
    function (data) {
      let indexPageSection = document.querySelector(
        ".shopify-section.index-sections"
      );
      if (indexPageSection) {
        indexPageSection.remove();
      }
      let body = document.body;

      if (
        body.classList.contains("template-index") &&
        body.classList.contains("index")
      ) {
        body.classList.remove("template-index");
        body.classList.remove("index");
        body.classList.add("template-page");
        body.classList.add("page");
      }
      let collectionSection = document.querySelector("#template-collection");
      let collectionDescription = document.querySelector(
        ".collection_description"
      );
      if (collectionSection && collectionDescription) {
        collectionSection.style.display = "none";
        collectionDescription.style.display = "none";
      }
      return data;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.AFTER_PRODUCTS_TRANSFORMED,
    function (products) {
      // console.log(products);
      products.forEach((product) => {
        if (product.colors && product.colors.length > 0) {
          product.hasMoreColor = "true";
        }
        if (product.categories) {
          product.categories.forEach((category) => {
            if (category.id === "new-clothing") {
              product.newArrivalTag = true;
            } else if (category.id === "clearance") {
              product.saleTag = true;
            } else if (category.id === "best-sellers-clothing") {
              product.bestSellerTag = true;
            }
          });
        }
      });

      return products;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_RENDER_RESULTS,
    function (data) {
      var searchbar = document.getElementById("search_mini_form");

      if (searchbar) {
        searchbar.style.display = "none";
      }
      let n = data?.response?.payload?.facets?.length;

      for (let i = 0; i < n; i++) {
        if (data.response.payload.facets[i].key === "product_Size") {
          let m = data.response.payload.facets[i].data.length;
          let newArray = [];
          for (let ii = 0; ii < availableSizeStrings.length; ii++)
            for (let jj = 0; jj < m; jj++)
              data.response.payload.facets[i].data[jj].key ===
                availableSizeStrings[ii] &&
                newArray.push(data.response.payload.facets[i].data[jj]);
          data.response.payload.facets[i].data = newArray;
        }else if (data.response.payload.facets[i].key === "product_Shoe Size") {
          let m = data.response.payload.facets[i].data.length;
          let newArray = [];
          for (let ii = 0; ii < availableShoeSizeStrings.length; ii++)
            for (let jj = 0; jj < m; jj++)
              data.response.payload.facets[i].data[jj].key ===
                availableShoeSizeStrings[ii] &&
                newArray.push(data.response.payload.facets[i].data[jj]);
          data.response.payload.facets[i].data = newArray;
        } else if (
          data.response.payload.facets[i].key ===
          "colors"
        ) {
          let facet = data.response.payload.facets[i];
          for (let j = 0; j < facet.data.length; j++) {
            item = updateColorFacetOption(facet.data[j]);
          }
        } else if (
          data.response.payload.facets[i].key ===
          "product_value_tags_dial_color"
        ) {
          let facet = data.response.payload.facets[i];
          for (let j = 0; j < facet.data.length; j++) {
            item = updateColorFacetOption(facet.data[j]);
          }
        }
      }

      // data.response.payload.facets = data.response.payload.facets.filter(
      //   (facet) => facet.data.length > 1
      // );

      return data;
    }
  );
  window.wizzyConfig.events.registerEvent(
  window.wizzyConfig.events.allowedEvents.VIEW_RENDERED,
    function (data) {
      

      let promotionBannerCollectionTitle = document.querySelector(".wz-promotion-banner-title-wrapper .wz-promotion-banner-collection-title");
      if (promotionBannerCollectionTitle) {
        // console.log(data.data.response.payload.banners[0].targetUrl.split("/").pop());
        promotionBannerCollectionTitle.innerHTML = data.data.response.payload.banners[0].targetUrl.split("/").pop();
      }

      if (checkWizzyfiltersApplied(window.location.href)) {
        removeDefaultCollectionGrid(); // remove default grid and skeleton if they are visible
      } else {
        try {
          moveGridFilterToDefaultGrid();
          showDefaultCollectionGrid(); // change to defult grid when no filter applied
        } catch (error) {
          console.log(error);
        }
      }

      return data;
    });
    window.wizzyConfig.events.registerEvent(
  window.wizzyConfig.events.allowedEvents.PRODUCTS_CACHED_RESULTS_RENDERED,
    function (data) {
      const wizzyCustomGridCollection = document.querySelector(".wizzy-custom-grid-collection");
      const wizzySkeletonSummaryAndSort = document.querySelector(".wizzy-skeleton-summary-and-sort");
      if(wizzyCustomGridCollection && wizzySkeletonSummaryAndSort) {
        wizzyCustomGridCollection.style.display = 'none';
        wizzySkeletonSummaryAndSort.style.display = 'none';
      }
      return data;
    });
};

window.isGridFiltersRendered = false;
function moveGridFilterToDefaultGrid() {
  console.log("moveGridFilterToDefaultGrid()");
  const defaultProductCountPerPage = 48;
  const params = new URLSearchParams(window.location.search);
  const currentPage = parseInt(params.get("page") || "1", 10) - 1;
  const gridFilters = window.wizzyConfig.gridFilters.filters;
  var currentPageProductIndexRange = {
    start: currentPage * defaultProductCountPerPage + 1,
    end: (currentPage + 1) * defaultProductCountPerPage,
  };
  const filteredGridFilters = gridFilters.filter(function (item) {
    var position = window.innerWidth < 768 ? item.after.mobile : item.after.web;
    return (
      position >= currentPageProductIndexRange.start &&
      position <= currentPageProductIndexRange.end
    );
  });
  if (!window.isGridFiltersRendered) {
    filteredGridFilters.forEach((filteredGridFilter) => {
      getGridFilterBasedOnKey(
        filteredGridFilter.key,
        filteredGridFilter,
        defaultProductCountPerPage
      );
      window.isGridFiltersRendered = true;
    });
  }
}

function getGridFilterBasedOnKey(
  key,
  filteredGridFilter,
  defaultProductCountPerPage
) {
  let wizzyFacetBlocks = document.querySelectorAll(
    ".wizzy-search-filters-left-wrapper .wizzy-facet-list-block .wizzy-filters-facet-block"
  );
  var gridBox;
  wizzyFacetBlocks.forEach((facetBlock) => {
    if (facetBlock.getAttribute("data-key") === key) {
      gridBox = facetBlock.cloneNode(true);
    }
  });

  if (gridBox) {
    gridBox.classList.add("wizzy-grid-filters-box");
    const gridBoxHead = gridBox.querySelector(".wizzy-facet-head");
    if (gridBoxHead) {
      gridBoxHead.setAttribute("title", filteredGridFilter.question);
      gridBoxHead.querySelector(".facet-head-title").textContent =
        filteredGridFilter.question;
    }
    const searchWrapper = gridBox.querySelector(".facet-search-wrapper");
    if (searchWrapper) {
      searchWrapper.remove();
    }
  } else {
    return;
  }

  try {
    const container = document.querySelector(".boost-pfs-filter-products");
    const productItems = container.querySelectorAll(".product__grid-item");
    const insertMap = {
      [(filteredGridFilter.after.web % defaultProductCountPerPage) - 1]:
        gridBox,
    };

    Object.keys(insertMap).forEach((indexStr) => {
      const index = parseInt(indexStr, 10);
      const target = productItems[index];
      if (target) {
        target.parentNode.insertBefore(gridBox, target.nextSibling);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function showDefaultCollectionGrid() {
  console.log("showDefaultCollectionGrid()");
  let wizzySearchResults = document.querySelector(
    "#wizzy-shopify-collection-page-wrapper .wizzy-search-results"
  );
  let collectionDefaultProducts = document.querySelector(
    ".collection-default-products"
  );
  let shopifySectionCollectionMain = document.querySelector(
    "#shopify-section-collection__main"
  );
  let collectionMain = document.querySelector(".collection__main");
  let wizzySkeletonResultsFilters = document.querySelector(
    ".wizzy-skeleton-results-filters"
  );
  let wizzySkeletonSort = document.querySelector(
    ".wizzy-skeleton-summary-and-sort"
  );
  let wizzyPagination = document.querySelector(".wizzy-search-pagination");
  if (
    wizzySearchResults &&
    shopifySectionCollectionMain &&
    collectionDefaultProducts &&
    wizzySkeletonResultsFilters &&
    wizzySkeletonSort &&
    wizzyPagination &&
    collectionMain
  ) {
    console.log("HERE====>")
    collectionDefaultProducts.innerHTML = "";
    wizzySearchResults.style.display = "none";
    wizzySkeletonSort.innerHTML = "";
    wizzySkeletonResultsFilters.style.display = "none";
    wizzyPagination.style.display = "none";
    collectionDefaultProducts.appendChild(shopifySectionCollectionMain);
    shopifySectionCollectionMain.style.display = "block";
    collectionMain.style.display = "block";
  }
}
function removeDefaultCollectionGrid() {
  console.log("removeDefaultCollectionGrid()");
  let defaultCollectionGrid = document.querySelector(
    "#template-collection .collection__content #shopify-section-collection__main"
  );
  let wizzyFilterSkeleton = document.querySelector(
    "#template-collection .collection__content .wizzy-skeleton-results-filters"
  );
  let wizzySkeletonSort = document.querySelector(
    ".wizzy-skeleton-summary-and-sort"
  );
  let x = document.querySelector(".wizzy-defualt-skeloton-and-result-wrapper");
  if (defaultCollectionGrid && wizzyFilterSkeleton && wizzySkeletonSort && x) {
    defaultCollectionGrid.style.display = "none";
    wizzyFilterSkeleton.style.display = "none";
    x.style.display = "none";
    wizzySkeletonSort.innerHTML = "";
  }
}

function updateColorFacetOption(item) {
  let color = findHaxCode(item.key);

  item.isSwatch = true;
  item.isURLSwatch = false;
  item.isVisualSwatch = true;
  item.swatchValue = color;
  item.data = {
    value: item.key,
    swatch: {
      type: "visual",
      value: color,
    },
  };
  return item;
}
