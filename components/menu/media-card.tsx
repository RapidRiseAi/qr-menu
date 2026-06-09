/* eslint-disable @next/next/no-img-element */
export function MenuMedia({
  type,
  url,
  name,
}: {
  type: string | null;
  url: string | null;
  name: string;
}) {
  if (!url || type === "none")
    return (
      <div className="flex h-32 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-200 to-orange-400 text-4xl">
        🍽️
      </div>
    );
  if (type === "video")
    return (
      <video
        src={url}
        muted
        playsInline
        controls
        className="h-40 w-full rounded-3xl object-cover"
      />
    );
  return (
    <img
      src={url}
      alt={name}
      className="h-40 w-full rounded-3xl object-cover"
    />
  );
}
