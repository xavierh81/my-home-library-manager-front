// Detect if we are server side or not
export function isServerSideScope() {
    return typeof window === 'undefined'
}