// Mock NextAuth structure to resolve v4/v5 API conflicts in Next.js builds
// Since CAMP utilizes AppContext client-side state for login demonstrations, this mock satisfies Next.js static page checks cleanly.

const mockHandler = async () => new Response(JSON.stringify({ status: "success" }), { status: 200 });

export const handlers = {
  GET: mockHandler,
  POST: mockHandler
};

export const signIn = async () => {};
export const signOut = async () => {};
export const auth = async () => null;
