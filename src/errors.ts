export class ArchiveError extends Error {
  public status: number;
  public url: string;
  public message: string;

  constructor(
    public method: string,
    response: Pick<Response, "status" | "url">,
    // we don't currently type all of our responses including their
    // possible errors, but we should
    // biome-ignore lint/suspicious/noExplicitAny: ^
    public data: any,
  ) {
    super();

    this.status = response.status;
    this.url = response.url;
    this.message =
      typeof data.value === "string"
        ? data.value
        : typeof data.error === "string"
          ? data.error
          : (data.message ?? "");
  }
}
