const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// A flat grey panel we show when there is no picture. It is drawn here as an
// svg rather than kept as a file, so there is no extra image to download.
const NO_IMAGE =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750'%3E%3Crect width='100%25' height='100%25' fill='%231f2a37'/%3E%3Ctext x='50%25' y='50%25' fill='%236b7a8d' font-family='sans-serif' font-size='32' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";

// The movie database leaves the path empty when it has no picture for a title.
// Without this we ask the browser for an address ending in "null", which shows
// a broken image icon.
export const imageUrl = (path) => (path ? `${IMAGE_BASE}${path}` : NO_IMAGE);

// A title that nobody has rated yet comes back without a score, and calling
// toFixed on that would crash the card.
export const formatRating = (value) => (Number.isFinite(value) ? value.toFixed(1) : 'NR');

// Titles that have not been released yet often have no date, and building a
// Date from nothing gives us NaN on the screen.
export const formatYear = (date) => {
    if (!date) {
        return '';
    }

    const year = new Date(date).getFullYear();
    return Number.isFinite(year) ? String(year) : '';
};
