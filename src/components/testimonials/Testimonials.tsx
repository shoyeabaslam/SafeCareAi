import { FC } from 'react';
import './Testimonials.css'

const userTestimonials = [
    {
        "name": "Alice Johnson",
        "rating": 5,
        "description": "This service is fantastic! It helped me quickly identify the safety of the ingredients in my skincare products. Highly recommended for anyone who wants to ensure they're using safe products."
    },
    {
        "name": "Michael Brown",
        "rating": 4,
        "description": "Great tool for checking product safety. The detailed analysis and recommendations are very helpful. It would be even better with more health condition-specific advice."
    },
    {
        "name": "Sophia Lee",
        "rating": 5,
        "description": "I'm very impressed with the accuracy and detail of the ingredient analysis. As someone with sensitive skin, this tool has been invaluable in helping me choose the right products."
    },
    {
        "name": "James Smith",
        "rating": 4,
        "description": "Very useful for anyone conscious about what goes into their products. The overall safety percentage and ingredient breakdown are easy to understand. A must-have tool!"
    },
    {
        "name": "Emily Davis",
        "rating": 5,
        "description": "I love how easy it is to use this service. Just upload the ingredient list and get an instant safety report. It has saved me a lot of time and worry. Highly recommended!"
    },
    {
        "name": "Daniel Garcia",
        "rating": 4,
        "description": "A great tool for checking product safety, especially for people with allergies or specific health conditions. It would be nice to have more detailed health-specific advice, but overall it's excellent."
    },
    {
        "name": "Olivia Martinez",
        "rating": 5,
        "description": "Amazing service! The safety evaluations are thorough and easy to understand. This has become my go-to tool for checking any new product I want to try."
    },
    {
        "name": "William Rodriguez",
        "rating": 4,
        "description": "Very helpful for evaluating the safety of personal care products. The ingredient analysis is detailed and informative. A bit more customization for individual health conditions would be great."
    },
    {
        "name": "Isabella Wilson",
        "rating": 5,
        "description": "As someone with multiple allergies, this tool has been a lifesaver. It gives me peace of mind knowing I can quickly check the safety of any product before using it."
    },
    {
        "name": "Henry Lopez",
        "rating": 4,
        "description": "Excellent tool for anyone concerned about product safety. The detailed ingredient analysis and recommendations are very helpful. Would love to see more features in the future!"
    }
]

const TestimonialCard:FC<{name:string,rating:number,description:string}> = ({ name, rating, description }) => {
    return (
      <div className="bg-white shadow-lg inline-block w-[400px] rounded-lg p-6 mb-4 mx-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <div className="text-yellow-500 mb-2">
            {'⭐'.repeat(rating)}
          </div>
          <p className="text-gray-600 text-sm sm:text-md">{description}</p>
        </div>
      </div>
    );
  };

const Testimonials = () => {

    return (
      <section id='Testimonials' className='testimonials py-5 min-h-[65vh]'>
        <h2 className='px-4 text-center my-6 text-3xl sm:text-4xl text-blue-500 font-Poetse'>User Reviews and Testimonials</h2>
          <div className="slider overflow-hidden py-2 mt-10">
            <div className='inner-slider inline-block'>
                <div className='flex'>
                {userTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    rating={testimonial.rating}
                    description={testimonial.description}
                    />
                ))}
                </div>
            </div>
            <div className='inner-slider  inline-block'>
                <div className='flex'>
                {userTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    rating={testimonial.rating}
                    description={testimonial.description}
                    />
                ))}
                </div>
            </div>
        </div>
      </section>
    );
};

export default Testimonials;
