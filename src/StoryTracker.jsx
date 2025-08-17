import React, { useState, useEffect } from 'react';
//import defaultStories from './stories.json';

function StoryTracker() {
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    status: '',
    assignedTo: '',
    sprint: '',
    tags: '',
    description: ''
  });

  // Load stories on mount (don't overwrite purged data!)
useEffect(() => {
  const stored = localStorage.getItem("storyEntries");
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      setStories(parsed);
    }
    // if empty array, skip setStories to preserve memory
  } catch (e) {
    console.error("Error loading storyEntries:", e);
  }
}, []);



  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("storyEntries", JSON.stringify(stories));
  }, [stories]);

  // Title toggle
  useEffect(() => {
    document.title = "Story Tracker Bot 🤖";
    return () => {
      document.title = "ScrumBot 🤖";
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newStory = {
      id: `PD-${Date.now()}`,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    setStories(prev => [...prev, newStory]);
    setFormData({
      title: '',
      priority: '',
      status: '',
      assignedTo: '',
      sprint: '',
      tags: '',
      description: ''
    });
  }

  function handlePurge() {
    const confirmPurge = window.confirm("😱 Are you sure you want to PERMANENTLY PURGE all these lovely records?");
    if (confirmPurge) {
      localStorage.removeItem("storyEntries");
      setStories([]);
    }
  }

  return (
    <div>
      <h2>📋 Story Tracker</h2>
      <form onSubmit={handleSubmit}>
        <h3>Add New Story</h3>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="priority" placeholder="Priority" value={formData.priority} onChange={handleChange} />
        <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
        <input name="assignedTo" placeholder="Assigned To" value={formData.assignedTo} onChange={handleChange} />
        <input name="sprint" placeholder="Sprint" value={formData.sprint} onChange={handleChange} />
        <input name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <br />
        <button type="submit">Add Story</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Sprint</th>
            <th>Tags</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story.id}>
              <td>{story.id}</td>
              <td>{story.title}</td>
              <td>{story.priority}</td>
              <td>{story.status}</td>
              <td>{story.assignedTo}</td>
              <td>{story.sprint}</td>
              <td>{Array.isArray(story.tags) ? story.tags.join(', ') : story.tags}</td>
              <td>{story.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <div style={{ textAlign: 'center' }}>
        <button onClick={handlePurge} className="purgeButton">
          PURGE ALL STORIES 📚🗑️😱
        </button>
      </div>
    </div>
  );
}

export default StoryTracker;
