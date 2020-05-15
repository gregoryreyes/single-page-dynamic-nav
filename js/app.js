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
  const navbarMenu = document.getElementsByClassName( 'navbar__menu' )[0];
  const mainHero = document.getElementsByClassName( 'main__hero' )[0];
  const mainSection = document.querySelector( 'main' );
  const sections = document.querySelectorAll( 'section' );
  const footer = document.getElementsByClassName( 'page__footer' )[0];
  const activeClassName = 'your-active-class';
  // End - Define Global Variables

  // Start Helper Functions
  function buildNavBasedOnAmountOfSections( children = null, parent = null ) {
    if ( children === null || parent === null ) {
      return 'please pass both the children and parent parameters' +
        'to the buildNavBasedOnAmountOfSections() function';
    } else {
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
  buildNavBasedOnAmountOfSections( sections, navbarMenu.children[0]  );
  // end building the nav

  // Begin Events
  navbarMenu.children[0] .addEventListener( 'click', e => {
    e.preventDefault();
    const dataNavSection = document.querySelector( `[data-nav="${e.target.innerText}"]`);

    // Scroll to section on link click
    const sectionID = document.getElementById( dataNavSection.id );
    sectionID.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  });

  // Start - add scroll to top functionality
  mainSection.insertAdjacentHTML( 'beforeend', '<div class="scroll-to-top"><i class="fa fa-arrow-up"></i></div>' );

  const scrollToTopIconWrap = document.getElementsByClassName( 'scroll-to-top' )[0];
  const scrollToTopIcon = document.getElementsByClassName( 'fa-arrow-up' )[0];
  const scrollToTopIcontStyle = 'display: block; margin: 0 1.7em; padding: 0.7em; position: fixed; bottom: 2.5em;' +
        ' right: 0; border-radius: 50%; background-color: rgba(0, 0, 0, 0.35);';

  scrollToTopIcon.addEventListener( 'click', e => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // end - add scroll to top functionality

  // start Intersection Observer section
  let observer = new IntersectionObserver( function( mutations ) {
    if ( mutations[0].target.tagName === 'SECTION' ) {
      document.getElementsByClassName( activeClassName )[0].classList.remove( activeClassName );
      mutations[0].target.classList.add( activeClassName );
    }

    if ( mutations[0].target === mainHero ) {
      if ( mutations[0].isIntersecting === true ) {
        scrollToTopIconWrap.style.cssText = 'display: none';
      } else {
        scrollToTopIconWrap.style.cssText = scrollToTopIcontStyle;
      }
    }

    if ( mutations[0].target === footer ) {
      if ( mutations[0].isIntersecting === true ) {
        scrollToTopIconWrap.style.cssText = 'display: none';
      } else {
        scrollToTopIconWrap.style.cssText = scrollToTopIcontStyle;
      }
    }
  } , { threshold: [ 0.7, 0.6 ] });

  observer.observe( mainHero );
  observer.observe( footer );

  for ( const section of sections ) {
    observer.observe( section );
  }
  // end Intersection Observer section

});


