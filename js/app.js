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

document.addEventListener( 'DOMContentLoaded', () => {
  // start - define global variables
  const header = document.getElementsByClassName( 'page__header' );
  const navbarMenu = document.getElementsByClassName( 'navbar__menu' )[0];
  const mainHero = document.getElementsByClassName( 'main__hero' )[0];
  const mainSection = document.querySelector( 'main' );
  const sections = document.querySelectorAll( 'section' );
  const footer = document.getElementsByClassName( 'page__footer' )[0];
  const activeClassName = 'your-active-class';
  // end - define global variables

  // start helper functions
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

        newElement.style.cssText = 'padding-left: 1em; cursor: pointer;'
        newElement.innerText = child.getAttribute( 'data-nav' );
        fragment.appendChild( newElement );
      }

      parent.appendChild( fragment );
    }
  }
  // end helper functions

  // start building the nav
  buildNavBasedOnAmountOfSections( sections, navbarMenu.children[0]  );
  // end building the nav

  // start events
  navbarMenu.children[0].addEventListener( 'click', e => {
    e.preventDefault();
    const dataNavSection = document.querySelector( `[data-nav="${e.target.innerText}"]`);
    const sectionID = document.getElementById( dataNavSection.id );

    sectionID.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  });

  let isScrolling;

  document.addEventListener( 'scroll', e => {
    e.preventDefault();

    header[0].style.cssText = 'display: none;';

    window.clearTimeout( isScrolling );
    isScrolling = setTimeout( () => {
      header[0].style.cssText =  'display: block;';
    }, 200 );

    for ( const section of sections ) {
      section.getBoundingClientRect().top < 300 && section.getBoundingClientRect().bottom > 300  ?
      section.classList.add( activeClassName ) :
      section.classList.remove( activeClassName );
    }
  });

  // start - scroll to top functionality
  mainSection.insertAdjacentHTML( 'beforeend', '<div class="scroll-to-top"><i class="fa fa-arrow-up"></i></div>' );

  const scrollToTopIconWrap = document.getElementsByClassName( 'scroll-to-top' )[0];
  const scrollToTopIcon = document.getElementsByClassName( 'fa-arrow-up' )[0];
  const scrollToTopIcontStyle = 'display: block; margin: 0 1.7em; padding: 0.7em; position: fixed; bottom: 2.5em;' +
        'cursor: pointer; right: 0; border-radius: 50%; background-color: rgba(0, 0, 0, 0.35);';

  scrollToTopIcon.addEventListener( 'click', e => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // end - scroll to top functionality
  // end events

  // start Intersection Observer section
  let observer = new IntersectionObserver( mutations => {
    if ( mutations[0].target === mainHero ) {
      scrollToTopIconWrap.style.cssText = mutations[0].isIntersecting === true ?
        'display: none' :
        scrollToTopIcontStyle;
    }

    if ( mutations[0].target === footer ) {
      scrollToTopIconWrap.style.cssText = mutations[0].isIntersecting === true ?
      'display: none' :
      scrollToTopIcontStyle;
    }
  } , { threshold: [ 0.7 ] });

  observer.observe( mainHero );
  observer.observe( footer );
  // end Intersection Observer section

});


