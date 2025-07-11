import { useSanctumClient } from '#imports';
import type { UseFetchOptions } from 'nuxt/app'; // Import for better options typing
import type { FetchResponse, FetchOptions } from 'ofetch'; // Import for more precise return type

/**
 * Interface for typical form data when submitting
 * Can be extended or replaced by more specific interfaces as needed.
 */
interface GenericFormData {
  [key: string]: any;
}

/**
 * A composable for making authenticated API requests using useSanctumClient.
 * Provides methods for POST and PATCH requests with enhanced typing and flexibility.
 */
export const useAuthApi = () => {
  const sanctumFetch = useSanctumClient();

  const resolveUrl = (url: string | (() => string)): string => {
    return typeof url === 'function' ? url() : url;
  };

  /**
   * Performs an authenticated POST request.
   *
   * @template TResponse The expected type of the response data.
   * @template TBody The type of the request body (form data).
   * @param url The API endpoint URL. Can be a string or a reactive function returning a string.
   * @param body The data to be sent in the request body.
   * @param options Optional UseFetchOptions to customize the request.
   * @returns A Promise that resolves to the API response, typed as FetchResponse<TResponse>.
   */
  async function post<
    TResponse = unknown,
    TBody extends GenericFormData = GenericFormData
  >(
    url: string | (() => string),
    body: TBody,
    nuxtOptions?: UseFetchOptions<TResponse> // Use nuxtOptions to avoid confusion
  ): Promise<FetchResponse<TResponse>> {
    const resolvedUrl = resolveUrl(url);

    // Extract only the properties that ofetch expects from UseFetchOptions
    const ofetchOptions: FetchOptions<TResponse> = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
      // responseType: 'json'
    };

    return await sanctumFetch<TResponse>(resolvedUrl, ofetchOptions);
  }

  /**
   * Performs an authenticated PATCH request.
   * Note: You had 'PUT' in your original patch function, but named it 'patch'.
   * I'm assuming you intended PATCH for partial updates, as per REST conventions.
   * If you need PUT (full replacement), you can create a separate put method or adjust this one.
   *
   * @template TResponse The expected type of the response data.
   * @template TBody The type of the request body (form data).
   * @param url The API endpoint URL. Can be a string or a reactive function returning a string.
   * @param body The data to be sent in the request body.
   * @param options Optional UseFetchOptions to customize the request.
   * @returns A Promise that resolves to the API response, typed as FetchResponse<TResponse>.
   */
  async function patch<
    TResponse = unknown,
    TBody extends GenericFormData = GenericFormData
  >(
    url: string | (() => string),
    body: TBody,
    options?: UseFetchOptions<TResponse>
  ): Promise<TResponse> {
    let headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
    
    const mergedOptions: FetchOptions<"json", TResponse> = {
      method: 'PATCH', // Changed from PUT to PATCH based on function name
      body: body,
      headers: headers
    };

    return await sanctumFetch<TResponse>(`${url}`, mergedOptions);
  }

  // You can easily add other HTTP methods like GET, PUT, DELETE here.
  /*
  async function get<TResponse = unknown>(
    url: string | (() => string),
    options?: UseFetchOptions<TResponse>
  ): Promise<FetchResponse<TResponse>> {
    return await sanctumFetch<TResponse>(url, { method: 'GET', ...options });
  }

  async function put<TResponse = unknown, TBody extends GenericFormData = GenericFormData>(
    url: string | (() => string),
    body: TBody,
    options?: UseFetchOptions<TResponse>
  ): Promise<FetchResponse<TResponse>> {
    const mergedOptions: UseFetchOptions<TResponse> = {
      method: 'PUT',
      body: body,
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
    return await sanctumFetch<TResponse>(url, mergedOptions);
  }

  async function remove<TResponse = unknown>(
    url: string | (() => string),
    options?: UseFetchOptions<TResponse>
  ): Promise<FetchResponse<TResponse>> {
    return await sanctumFetch<TResponse>(url, { method: 'DELETE', ...options });
  }
  */

  return {
    post,
    patch,
    // get,
    // put,
    // remove,
  };
};



// type Album = {
//   userId: number,
//   id: number,
//   body: string
// }

// type Post = {
//   userId: number,
//   id: number,
//   title: string,
//   body: string
// }

// type Comment = {
//   id: number,
//   name: string,
//   body: string,
//   email: string,
//   postId: string,
// }

// const { data } = await useAsyncData('fetch-data', async () => {
//     return await Promise.all([
//       $fetch<Album[]>(`https://jsonplaceholder.typicode.com/albums`),
//       $fetch<Post[]>(`https://jsonplaceholder.typicode.com/posts`),
//       $fetch<Comment[]>(`https://jsonplaceholder.typicode.com/comments`),
//       $fetch<Comment>(`https://jsonplaceholder.typicode.com/comments/1`)
//     ])
//   }, { 
//     lazy: true, 
//     dedupe: 'cancel' 
//   })
    
//   if (data.value) {
//     const [albums, posts, comments, comment] : [Album[], Post[], Comment[], Comment] = data.value
//     console.log(albums, posts, comments, comment);
//   }

// const [albums, posts, comments, comment]: [Album[], Post[], Comment[], Comment] = await Promise.all([
    //   $fetch<Album[]>(`https://jsonplaceholder.typicode.com/albums`),
    //   $fetch<Post[]>(`https://jsonplaceholder.typicode.com/posts`),
    //   $fetch<Comment[]>(`https://jsonplaceholder.typicode.com/comments`),
    //   $fetch<Comment>(`https://jsonplaceholder.typicode.com/comments/1`)
    // ])