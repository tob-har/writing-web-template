// TOGGLE BUTTONS: BRIGHT/DARK MODE, FONT FAMILY, FONT SIZE

const toggleDarkModeBtn = document.querySelector('#toggle-dark-mode');
const toggleFontBtn = document.querySelector('#toggle-font-type');
const toggleFontSizeBtn = document.querySelector('#toggle-font-size');
const bodyEl = document.body;

    // toggle Dark Mode
    toggleDarkModeBtn.addEventListener('click', function() {
      bodyEl.classList.toggle('dark-mode');

      if (bodyEl.classList.contains('dark-mode')) {
      toggleDarkModeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
      } else {
      toggleDarkModeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
      }
    });

    //toggle Font Family
    toggleFontBtn.addEventListener('click', function() {
      bodyEl.classList.toggle('sans');

      if (bodyEl.classList.contains('sans')) {
      toggleFontBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>';
      } else {
      toggleFontBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 4 4 4 20 4 20 4"></polyline><line x1="12" y1="4" x2="12" y2="20"></line></svg>';
      }
    });

    

    //toggle Font Size
    toggleFontSizeBtn.addEventListener('click',function() {
      var html = document.querySelector('html');
      if (html.style.fontSize === '13px') {
        html.style.fontSize = '15px';
        toggleFontSizeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>';
      } else {
        html.style.fontSize = '13px';
        toggleFontSizeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>';
      }
    });


// BACK TO TOP BUTTON

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.querySelector('.back-to-top').classList.add('show');
    } 
  else {
    document.querySelector('.back-to-top').classList.remove('show');
    }
}

document.querySelector('.back-to-top').addEventListener('click', function(scrollbacktotop) {
  scrollbacktotop.preventDefault();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  });




// Generate Tooltip content for Sidenotes from bibliography
// Displays <li> content from bibliography to be displayed in tooltiops on hover

document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('.sidenote');
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const liId = span.dataset.li;
      const li = document.querySelector(`#${liId}`);
      if (li) {
        span.title = li.textContent;
      }
    }
  });




// GENERATE HEADINGS NUMBERING

const article = document.querySelector('#all-content');
let currentLevel = 2;
let h2Counter = 0;
let h3Counter = 0;

function addNumbersToHeadings(element) {
  const docHeadings = element.querySelectorAll('h2, h3');
  for (let i = 0; i < docHeadings.length; i++) {
    const currentProcessedHeading = docHeadings[i];
    const level = parseInt(currentProcessedHeading.tagName.substring(1)); // Extract the heading level from the tag name (e.g., "h2" -> 2)
    // Check if the current heading level is greater than or equal to 2, for Error Logging
    if (level < 2) {
      console.error(`Error: Invalid heading level: ${level}. Only levels 2 and 3 are supported.`);
      continue;
    }

    if (level === 2) {
      h2Counter++;
      h3Counter = 0;
    } else if (level === 3) {
      h3Counter++;
    }

    // Generate new headings text with the Format: Numbers from counters + text
    const putHeadingNumber = (level === 2) ? `${h2Counter}.` : `${h2Counter}.${h3Counter}.`;
    const getHeadingText = currentProcessedHeading.textContent.trim();
    const newHeadingText = `${putHeadingNumber} ${getHeadingText}`;

    currentProcessedHeading.textContent = newHeadingText;
    addNumbersToHeadings(currentProcessedHeading);
  }
}

// Call the recursive function on the article element to add numbers to all headings
addNumbersToHeadings(article);




// GENERATE TABLE OF CONTENTS FOR WEB VIEW

const tocHeadings = document.querySelectorAll('h2, h3');
var tocUl = document.createElement("ul");
tocUl.classList.add("toc-styling");

for (var i = 0; i < tocHeadings.length; i++) {
    var tocItemtext = tocHeadings[i].textContent;
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.textContent = tocItemtext;
    a.href = "#" + tocHeadings[i].id;
    li.appendChild(a);
    // add class "toc-indent" to li element for h3 headings indentation
    if (tocHeadings[i].tagName.toLowerCase() === 'h3') {
        li.classList.add('toc-indent');
    }
    tocUl.appendChild(li);
}

document.getElementById("toc-placeholder").appendChild(tocUl);




// MAKE TOC LARGE AFTER CLICKING HEADING

function toggleHeight() {
    const contentTocContainer = document.getElementById('toc-container');
    if (contentTocContainer.style.height === '400px') {
        contentTocContainer.style.height = '40px';
    } else {
        contentTocContainer.style.height = '400px';
        contentTocContainer.style.transition = 'height 0.6s ease-in-out';
    }
}



// CLOSE THE TOC AFTER CLICKING A LINK, MAKE IT SMALL AGAIN, set Location Hash

const tocLinks = document.querySelectorAll('#the-table-of-content ul li a');
tocLinks.forEach(link => {
    link.addEventListener('click', () => {
        const detailsElement = document.getElementById('the-table-of-content');
        detailsElement.removeAttribute('open');

        const contentTocContainer = document.getElementById('toc-container');
   		  if (contentTocContainer.style.height === '40px') {
         contentTocContainer.style.height = '400px';
    	  } 
        else {
        contentTocContainer.style.height = '40px';
        contentTocContainer.style.transition = 'height 0.2s ease-in-out';  
        }

        event.preventDefault();
        window.location.hash = event.target.getAttribute("href");
    });
});




// SCROLL OFFSET TO ALL SCROLLINGS TO AN A ELEMENT

// Get all anchor tags with a hash (#) in the href attribute
const anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(anchor => {
  anchor.addEventListener('click', function(scrollWithOffset) {
    scrollWithOffset.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetTop - 80, /* Offset in Pixels */
      behavior: 'smooth'
    });
  });
});

