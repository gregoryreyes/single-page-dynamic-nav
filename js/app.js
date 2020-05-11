/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

document.addEventListener( 'DOMContentLoaded', function() {
    // Start - Define Global Variables
    const navbarUl = document.getElementById( 'navbar__list' );
    const sections = document.querySelectorAll( 'section' );
    const activeClassName = 'your-active-class';
    // End - Define Global Variables

    // Start Helper Functions
    function buildNavBasedOnAmountOfSections( children = null, parent = null ) {
      if ( children === null || parent === null ) {
        return 'please pass both the children and parent parameters' +
          'to the buildNavBasedOnAmountOfSections() function';
      } else {
        const navbarMenu = document.getElementsByClassName( 'navbar__menu' )[0];
        navbarMenu.style.cssText = 'background: #000; padding: 2em;';
        const fragment = document.createDocumentFragment();

        for ( const child of children ) {
          child.querySelectorAll( 'h2' )[0].setAttribute( 'style', 'margin-top: 1.8em;')
          const newElement = document.createElement( 'li' );

          newElement.style.cssText = 'padding-left: 1em;'
          newElement.innerText = child.getAttribute( 'data-nav' );
          fragment.appendChild( newElement );
        }

        parent.appendChild( fragment );
      }
    }

    function addActiveClassToSection( activeSection = null, sections = null ) {
      if ( activeSection === null || sections === null ) {
        return 'addActiveClassToSection requires activeSection and sections parameters';
      } else {
        for ( const section of sections ) {
          section.id === activeSection.id ? section.classList.add( activeClassName ) : section.classList.remove( activeClassName );
        }
      }
    }
    // End Helper Functions

    // start building the nav
    buildNavBasedOnAmountOfSections( sections, navbarUl );
    // end building the nav

    // Begin Events
    navbarUl.addEventListener( 'click', e => {
      e.preventDefault();
      const dataNavSection = document.querySelector( `[data-nav="${e.target.innerText}"]`);

      // Scroll to section on link click
      const sectionID = document.getElementById( dataNavSection.id );
      sectionID.scrollIntoView( { behavior: 'smooth', block: 'start' } );

      // Add class 'active' to section when near top of viewport
      addActiveClassToSection( sectionID, sections );
    });
    // End Events

    document.addEventListener( 'scroll', function() {
      for ( const section of sections ) {
        console.log( section.id + ' section.getBoundingClientRect().top ----> ', section.getBoundingClientRect().top );
        if ( section.getBoundingClientRect().top < 120 && section.getBoundingClientRect().bottom > 200  ) {
          section.classList.add( activeClassName );
        } else {
          if ( section.className === activeClassName ) {
            section.classList.remove( activeClassName );
          }
        }
      }
    });

});


