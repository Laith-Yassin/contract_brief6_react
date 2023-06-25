import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/YouTubeVideo.css'; 

const YouTubeVideo = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                maxResults: 1,
                key: 'AIzaSyBG5IYDJXHN7S46gCn8XFbgIB60EvlhjLM',
                channelId: 'UCzRkC3d30XsOb2MU44eA-9w'
            }
        })
        .then(response => {
            console.log(response.data.items);
            setVideos(response.data.items);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className="youtube-video-container">
            <h2>About Us</h2>
            {videos.map(video => (
                <div className="video-wrapper" key={video.id.videoId}>
                <div className="video-player">
                    <iframe title="youtube"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/XsFMAq48qhc`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="video-text">
                    <p>
                    Smart Solutions is a trusted IT consulting company that empowers businesses through strategic technology integration. With a dedicated team of experts, we offer tailored IT services to help organizations navigate the digital landscape and achieve their goals. By immersing ourselves in our clients' businesses, we develop customized solutions that optimize efficiency and create competitive advantages. With expertise in IT strategy, infrastructure, software development, cloud computing, data analytics, and cybersecurity, we stay at the forefront of technological advancements. We foster lasting partnerships by providing ongoing support and maintenance services. Partner with Smart Solutions to unlock your business's true potential and embark on a journey of digital growth and success.
                    </p>
                    
                </div>
            </div>
            ))}
        </div>
    );
}

export default YouTubeVideo;