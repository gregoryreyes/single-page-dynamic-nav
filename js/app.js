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
  });

  // Start - add scroll to top functionality
  const mainSection = document.querySelector( 'main' );
  mainSection.insertAdjacentHTML( 'beforeend', '<div class="scroll-to-top"><i class="fa fa-arrow-up"></i></div>' );

  const scrollToTopIconWrap = document.getElementsByClassName( 'scroll-to-top' )[0];
  scrollToTopIconWrap.style.cssText = 'display:none;';

  const scrollToTopIcon = document.getElementsByClassName( 'fa-arrow-up' )[0];
  scrollToTopIcon.style.cssText = 'padding: 0.7em';

  scrollToTopIcon.addEventListener( 'click', e => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // end - add scroll to top functionality

  // Add class 'active' to section when near top of viewport
  const activeClassName = 'your-active-class';

  document.addEventListener( 'scroll', function() {

    if ( mainSection.getBoundingClientRect().top < -220 ) {
      scrollToTopIconWrap.style.cssText = 'display: block; margin: 0 2em; position: fixed; bottom: 1em;' +
        ' right: 0; border-radius: 50%; background-color: rgba(0, 0, 0, 0.35);';
    } else {
      scrollToTopIconWrap.style.cssText = 'display:none;';
    }

    for ( const section of sections ) {
      if ( section.getBoundingClientRect().top < 120 && section.getBoundingClientRect().bottom > 200  ) {
        section.classList.add( activeClassName );
      } else {
        if ( section.className === activeClassName ) {
          section.classList.remove( activeClassName );
        }
      }
    }
  });
  // End Events

});


