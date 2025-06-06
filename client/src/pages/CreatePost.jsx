import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8000/api/v1/imgGenerate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto bg-gray-900 text-gray-100 p-8 rounded-2xl">
      <div className="justify-center text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-100 md:text-5xl lg:text-6xl">
          Create <mark className="px-2 text-white bg-blue-600 rounded">AI</mark> Images
        </h1>
        <p className="text-lg font-normal text-gray-400 lg:text-xl">
          Unleash the power of our AI model from Hugging Face to turn your wildest ideas into stunning visual creations. Share your imagination with the community and bring your dreams to life!
        </p>
      </div>

      <form className="mt-16 max-w-3xl bg-gray-950 p-8 rounded-2xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Enter Your name"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A Bollywood dance party with dancers in vibrant traditional attire...."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gradient-to-b from-[#23272e] to-[#1a1d23] border border-gray-700 text-gray-100 text-sm rounded-2xl w-64 p-3 h-64 flex justify-center items-center overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-40 rounded-lg">
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain"
                />
              </div>
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className={`text-white bg-gradient-to-r from-[#4CAF50] to-[#45A249] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none transition-all duration-300 ${generatingImg ? 'cursor-not-allowed opacity-70' : 'hover:opacity-90'}`}
            disabled={generatingImg}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            <strong>Ready to showcase your creation?</strong> Share your imaginative image with the community!
          </p>
          <button
            type="submit"
            className="mt-4 text-white bg-gradient-to-r from-[#3B82F6] to-[#2563EB] font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 focus:outline-none transition-all duration-300 hover:opacity-90 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
