/* Shared English and Chinese interactions. Content and abstracts also work without JavaScript. */
(() => {
  if (!/^(en|zh)/.test(document.documentElement.lang)) return;
  const init = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const activeMotion = new Set();
    const easeOut = 'cubic-bezier(.23,1,.32,1)';
    let keyboardInput = false;
    document.addEventListener('keydown', () => { keyboardInput = true; }, true);
    document.addEventListener('pointerdown', () => { keyboardInput = false; }, true);
    document.addEventListener('wheel', () => { keyboardInput = false; }, { passive: true });
    // Hover/focus reveals the badge; clicking pins it for touch and mouse users.
    // The home link stays separate. Escape and an outside interaction dismiss it.
    const brand = document.querySelector('.brand-lockup');
    const badge = brand?.querySelector('.brand-badge');
    if (brand && badge) {
      let pinned = false;
      const showBadge = open => {
        brand.classList.toggle('is-open', open);
        badge.setAttribute('aria-expanded', String(open));
      };
      const dismissBadge = () => { pinned = false; showBadge(false); };
      brand.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') showBadge(true);
      });
      brand.addEventListener('pointerleave', () => {
        if (!pinned && !(keyboardInput && brand.contains(document.activeElement))) showBadge(false);
      });
      brand.addEventListener('focusin', () => { if (keyboardInput) showBadge(true); });
      brand.addEventListener('focusout', event => {
        if (!brand.contains(event.relatedTarget)) dismissBadge();
      });
      badge.addEventListener('click', () => { pinned = !pinned; showBadge(pinned); });
      document.addEventListener('pointerdown', event => {
        if (!brand.contains(event.target)) dismissBadge();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') dismissBadge();
      });
    }
    const animate = (element, frames, options = {}) => {
      if (!element || reducedMotion.matches || document.hidden || !element.animate) return;
      const animation = element.animate(frames, { duration: 220, easing: easeOut, ...options });
      activeMotion.add(animation);
      const forget = () => activeMotion.delete(animation);
      animation.addEventListener('finish', forget, { once: true });
      animation.addEventListener('cancel', forget, { once: true });
      return animation;
    };
    const stopMotion = () => { activeMotion.forEach(animation => animation.cancel()); activeMotion.clear(); };
    reducedMotion.addEventListener('change', event => { if (event.matches) stopMotion(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); });

    // Start entrance motion only after the page is visible and its first paint is ready.
    // Background-tab observations must not consume an entrance the reader never sees.
    const english = document.documentElement.lang.startsWith('en');
    let entrancesReady = false;
    const inView = new Set();
    const entered = new WeakSet();
    const revealVisible = () => {
      if (!entrancesReady || document.hidden) return;
      let index = 0;
      inView.forEach(element => {
        if (entered.has(element)) return;
        entered.add(element);
        if (keyboardInput || reducedMotion.matches) return;
        animate(element,
          [{ opacity: english ? 0 : .55, transform: `translateY(${english ? 22 : 12}px)` },
           { opacity: 1, transform: 'translateY(0)' }],
          { duration: english ? 560 : 380, delay: Math.min(index++, 3) * (english ? 90 : 45), fill: 'backwards' });
      });
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= .12) inView.add(entry.target);
          else if (!entry.isIntersecting) {
            inView.delete(entry.target);
            // Re-arm only once the surface has completely left the viewport.
            if (english) entered.delete(entry.target);
          }
        });
        revealVisible();
      }, { threshold: [0, .12] });
      const targets = '.intro-heading,.portrait-frame,.intro-research h2,.research-tool,.insight-image,.chapter-heading';
      document.querySelectorAll(targets).forEach(element => observer.observe(element));
    }
    const startEntrances = () => {
      if (document.hidden) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        entrancesReady = true;
        revealVisible();
      }));
    };
    if (document.readyState === 'complete') startEntrances();
    else window.addEventListener('load', startEntrances, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && document.readyState === 'complete') startEntrances();
    });

    // Native disclosures remain available without JS. Pointer actions animate height;
    // keyboard, reduced-motion and background-tab actions settle immediately.
    const disclosureSettlers = new Set();
    document.querySelectorAll('.paper-abstract,.paper-audio,.tool-details').forEach(details => {
      const summary = details.querySelector('summary');
      let opening, wanted = details.open;
      const finish = () => {
        const previous = opening;
        opening = null;
        if (previous) previous.cancel();
        details.open = wanted;
        details.style.removeProperty('height');
        details.style.removeProperty('overflow');
        disclosureSettlers.delete(finish);
      };
      summary?.addEventListener('click', event => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        const startHeight = details.getBoundingClientRect().height;
        wanted = !wanted;
        if (opening) { const previous = opening; opening = null; previous.cancel(); }
        if (event.detail === 0 || reducedMotion.matches || document.hidden || !details.animate) {
          finish(); return;
        }
        details.open = true;
        details.style.height = 'auto';
        const endHeight = wanted ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
        details.style.overflow = 'hidden';
        const current = animate(details, [{ height: `${startHeight}px` }, { height: `${endHeight}px` }], { duration: 220 });
        if (!current) { finish(); return; }
        opening = current;
        disclosureSettlers.add(finish);
        current.addEventListener('finish', () => { if (opening === current) finish(); }, { once: true });
      });
      details.addEventListener('toggle', () => { if (!opening) wanted = details.open; });
    });
    const settleDisclosures = () => [...disclosureSettlers].forEach(finish => finish());
    reducedMotion.addEventListener('change', event => { if (event.matches) settleDisclosures(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) settleDisclosures(); });
    window.addEventListener('resize', settleDisclosures);
    const menuButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.english-menu');
    const closeMenu = () => {
      menu?.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    };
    menuButton?.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
        closeMenu(); menuButton.focus();
      }
    });
    // Native anchor navigation, including hash/history and keyboard focus.
    // Capture avoids the theme's separate smooth-scroll handler.
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault(); event.stopPropagation(); closeMenu();
      history.pushState(null, '', url.hash);
      target.scrollIntoView({ behavior: event.detail > 0 && !reducedMotion.matches ? 'smooth' : 'auto', block: 'start' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, true);
    document.querySelectorAll('[data-research-list]').forEach(list => {
      const filters = list.querySelector('.research-filters');
      const result = list.querySelector('.filter-result');
      const papers = [...list.querySelectorAll('[data-paper]')];
      if (!filters || !result) return;
      filters.hidden = false; result.hidden = false;
      const update = topic => {
        let count = 0;
        papers.forEach(paper => {
          paper.hidden = topic !== 'all' && !paper.dataset.topics.split(' ').includes(topic);
          if (!paper.hidden) count++;
        });
        filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === topic)));
        list.querySelectorAll('.research-group').forEach(group => {
          const entries = [...group.querySelectorAll('[data-paper]')];
          const visible = entries.filter(paper => !paper.hidden);
          group.hidden = visible.length === 0;
        });
        result.textContent = `${count} ${count === 1 ? 'paper' : 'papers'}${topic === 'all' ? '' : ' in this topic'}`;
      };
      filters.addEventListener('click', event => {
        const button = event.target.closest('button[data-topic]');
        if (!button || button.getAttribute('aria-pressed') === 'true') return;
        update(button.dataset.topic);
        if (event.detail > 0) papers.filter(paper => !paper.hidden).forEach(paper => {
          const heading = paper.querySelector('h3');
          heading?.getAnimations().forEach(animation => animation.cancel());
          animate(heading, [{ opacity: .55 }, { opacity: 1 }], { duration: 160 });
        });
      });
      update('all');
    });
    // Native horizontal scrolling also works without JS; add mouse dragging and controls.
    document.querySelectorAll('.insight-carousel').forEach(carousel => {
      const track = carousel.querySelector('.insight-list');
      const cards = [...track.querySelectorAll('.insight-row')];
      const controls = carousel.querySelector('.insight-controls');
      const previous = controls.querySelector('[data-insight-step="-1"]');
      const next = controls.querySelector('[data-insight-step="1"]');
      const position = controls.querySelector('.insight-position');
      controls.hidden = false;
      const refresh = () => {
        const bounds = track.getBoundingClientRect();
        const visible = cards.map((card, index) => ({ box: card.getBoundingClientRect(), index }))
          .filter(({ box }) => Math.min(box.right, bounds.right) - Math.max(box.left, bounds.left) > box.width / 2);
        previous.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
        if (visible.length) {
          const first = visible[0].index + 1, last = visible[visible.length - 1].index + 1;
          position.textContent = `${first === last ? first : `${first}–${last}`} / ${cards.length}`;
        }
      };
      const browse = (direction, immediate = false) => track.scrollBy({ left: direction * (track.clientWidth + parseFloat(getComputedStyle(track).columnGap)), behavior: immediate || reducedMotion.matches ? 'auto' : 'smooth' });
      controls.addEventListener('click', event => {
        const button = event.target.closest('[data-insight-step]');
        if (button) browse(Number(button.dataset.insightStep), event.detail === 0);
      });
      track.addEventListener('keydown', event => {
        if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'Home' || event.key === 'End') track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'auto' });
        else browse(event.key === 'ArrowLeft' ? -1 : 1, true);
      });
      let drag, suppressClickUntil = 0, scrollTimer;
      track.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button === 0) drag = { id: event.pointerId, x: event.clientX, scroll: track.scrollLeft, moved: false };
      });
      track.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const distance = event.clientX - drag.x;
        if (!drag.moved && Math.abs(distance) > 6) {
          drag.moved = true;
          track.setPointerCapture(event.pointerId);
          track.classList.add('is-dragging');
        }
        if (drag.moved) { event.preventDefault(); track.scrollLeft = drag.scroll - distance; }
      });
      const stopDrag = () => {
        const finished = drag;
        drag = null;
        if (finished?.moved) {
          suppressClickUntil = performance.now() + 300;
          track.classList.remove('is-dragging');
          if (track.hasPointerCapture(finished.id)) track.releasePointerCapture(finished.id);
        }
      };
      track.addEventListener('pointerup', stopDrag);
      track.addEventListener('pointercancel', stopDrag);
      track.addEventListener('lostpointercapture', stopDrag);
      track.addEventListener('pointerleave', () => { if (!drag?.moved) drag = null; });
      track.addEventListener('dragstart', event => event.preventDefault());
      track.addEventListener('click', event => {
        if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
      }, true);
      track.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(refresh, 120); }, { passive: true });
      if ('ResizeObserver' in window) new ResizeObserver(refresh).observe(track);
      refresh();
    });
    // Keep the skip target available on other English content pages too.
    if (!document.getElementById('main-content')) {
      const main = document.querySelector('.page-body');
      if (main) { main.id = 'main-content'; main.tabIndex = -1; main.setAttribute('role', 'main'); }
    }
    // Native audio controls supply seeking, volume, keyboard support and errors.
    document.querySelectorAll('audio').forEach(audio => {
      audio.addEventListener('play', () => document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); }));
      audio.closest('details')?.addEventListener('toggle', event => { if (!event.target.open) audio.pause(); });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
