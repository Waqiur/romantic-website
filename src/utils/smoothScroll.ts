/**
 * Smooth scrolling utility functions
 */

export const smoothScrollTo = (
    target: Element | string,
    options: ScrollIntoViewOptions = {}
): void => {
    const element =
        typeof target === "string" ? document.querySelector(target) : target;

    if (!element) {
        console.warn("Smooth scroll target not found:", target);
        return;
    }

    const defaultOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
        ...options,
    };

    element.scrollIntoView(defaultOptions);
};

export const smoothScrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export const smoothScrollToElement = (
    element: Element,
    offset: number = 0
): void => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
};

export const getScrollProgress = (): number => {
    const scrollTop = window.pageYOffset;
    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    return docHeight > 0 ? scrollTop / docHeight : 0;
};

export const isElementInViewport = (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
};
