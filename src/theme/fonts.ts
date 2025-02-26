import localFont from 'next/font/local';

export const oldLondon = localFont({
    src: [
        {
            path: '/fonts/OldLondon.ttf',
        }
    ],
    display: 'swap',
    variable: '--old-london',
});

export const oldNewspaper = localFont({
    src: [
        {
            path: '/fonts/OldNewspaperTypes.ttf',
            weight: '700',
            style: 'normal',
        }
    ],
    display: 'swap',
    variable: '--old-newspaper',
});

export const secondaryFont = 'Barlow, sans-serif';