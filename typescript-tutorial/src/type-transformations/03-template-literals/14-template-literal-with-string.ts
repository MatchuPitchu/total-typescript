// The template literal syntax in TypeScript is similar to the JavaScript syntax, except you can put types inside of it.
type Route = `/${string}`;

export const goToRoute = (route: Route) => {};

// Should succeed:
goToRoute('/users');
goToRoute('/');
goToRoute('/admin/users');

// Should error:
goToRoute('users/1');
goToRoute('http://facebook.com');
