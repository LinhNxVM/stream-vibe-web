import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html);
};

export const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};