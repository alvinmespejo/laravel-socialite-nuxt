import type { UseFetchOptions } from '#app';
import { useSanctumClient } from '#imports';
import type { FetchOptions } from 'ofetch'; // Import for more precise return type
// import type { UseFetchOptions } from 'nuxt/app'; // Import for better options typing

/**
 * Interface for typical form data when submitting
 * Can be extended or replaced by more specific interfaces as needed.
 */
interface GenericFormData {
  [key: string]: any;
}

type SanctumFetchOption<TResponse> = FetchOptions<"json", TResponse>

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
   * @param options Optional SanctumFetchOption to customize the request.
   * @returns A Promise that resolves to the API response, typed as Promise<any>.
   */
  async function post<
    TResponse = unknown,
    TBody extends GenericFormData = GenericFormData
  >(
    url: string | (() => string),
    body: TBody,
    options?: SanctumFetchOption<TResponse> // Use options to avoid confusion
  ): Promise<any> {
    const resolvedUrl = resolveUrl(url);

    let headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
    
    // Extract only the properties that ofetch expects from UseFetchOptions
    const fetchOptions: SanctumFetchOption<TResponse> = {
      method: 'POST',
      body: body,
      headers: headers,
    };

    return await sanctumFetch<TResponse>(resolvedUrl, fetchOptions);
  }

  /**
   * Performs an authenticated PATCH request.
   *
   * @template TResponse The expected type of the response data.
   * @template TBody The type of the request body (form data).
   * @param url The API endpoint URL. Can be a string or a reactive function returning a string.
   * @param body The data to be sent in the request body.
   * @param options Optional SanctumFetchOption to customize the request.
   * @returns A Promise that resolves to the API response, typed as Promise<any>.
   */
  async function patch<
    TResponse = unknown,
    TBody extends GenericFormData = GenericFormData
  >(
    url: string | (() => string),
    body: TBody,
    options?: SanctumFetchOption<TResponse>
  ): Promise<any> {
    const mergedOptions: SanctumFetchOption<TResponse> = {
      method: 'PATCH',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    };

    return await sanctumFetch<TResponse>(resolveUrl(url), mergedOptions);
  }

  async function put<
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
    }

    const mergedOptions: FetchOptions<"json", TResponse> = {
      method: 'PUT',
      body: body,
      headers: headers,
    };

    return await sanctumFetch<TResponse>(resolveUrl(url), mergedOptions);
  }

  async function remove<TResponse = unknown>(
    url: string | (() => string),
    options?: UseFetchOptions<TResponse>
  ): Promise<TResponse> {
    let headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...options?.headers
    }

    const mergedOptions: FetchOptions<'json', TResponse> = {
      method: 'DELETE',
      headers: headers,
    }

    return await sanctumFetch<TResponse>(resolveUrl(url), mergedOptions)
  }

  async function get<
    Tresponse = unknown>(
      url: string, 
      options?: UseFetchOptions<Tresponse>
    ): Promise<Tresponse> {
    
      let headers: Record<string, any> = {
        'Content-Type': 'application/json',
        ...options?.headers
      }

      const mergedOptions: FetchOptions<'json', Tresponse> = {
        method: 'GET',
        headers: headers
      }

      return await sanctumFetch<Tresponse>(resolveUrl(url), mergedOptions)
  }

  return {
    post,
    patch,
    put,
    remove,
    get,
  };
};
