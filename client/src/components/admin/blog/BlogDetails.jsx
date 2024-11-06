import React from 'react';

function BlogDetails({ event }) {
  return (
    <>
      <article className="max-w-2xl px-6 py-24 mx-auto space-y-1 hide-scrollbar rounded-lg">
        <div className="w-full mx-auto space-y-4 text-center">
          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{event.title}</h1>
          
          {/* Creator and Date */}
          <p className="text-sm dark:text-gray-600">
            by 
            <a
              rel="noopener noreferrer"
              href="#"
              target="_blank"
              className="underline dark:text-violet-600"
            >
              <span itemProp="name">{event.creator}</span>
            </a> 
            on 
            <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
          </p>
        </div>

        {/* Event Content */}
        <div className="dark:text-gray-800 space-y-4">
          {event.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Creator Information */}
        <div className="pt-12 border-t dark:border-gray-300">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img
              src={event.creatorInfo.imageUrl || "https://icon-library.com/images/username-icon/username-icon-24.jpg"}
              className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
            />
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold">{event.creatorInfo.name}</h4>
              <p className="dark:text-gray-600">{event.creatorInfo.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogDetails;
