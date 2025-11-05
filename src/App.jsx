import React, { useState } from "react";
import "./app.css";

export default function LiveFormWithPreview() {
  const skillSuggestions = ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python", "C/C++", "Java", "SQL", "TypeScript"];
  const countrySuggestions = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "China", "Brazil"];

  const [form, setForm] = useState({ name: "", phone: "", email: "", bio: "", gender: "", country: "" });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const addSkill = () => { if (skillInput && !skills.includes(skillInput)) setSkills([...skills, skillInput]); setSkillInput(""); };
  const removeSkill = (s) => setSkills(skills.filter(x => x !== s));
  const handleSkillKey = (e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } };
  const clearForm = () => { setForm({ name: "", phone: "", email: "", bio: "", gender: "", country: "" }); setSkills([]); };
  const initials = (n) => !n ? "??" : n.trim().split(" ").map(p => p[0]).join("").slice(0, 2);

  return (
    <div className="form-container">
      <div className="form-box">
        <div className="form-section">
          <h2>Profile Form</h2>
          <label>Name<input name="name" value={form.name} onChange={handleChange} placeholder="Full name" /></label>
          <label>Phone<input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" /></label>
          <label>Email<input name="email" value={form.email} onChange={handleChange} placeholder="Email" /></label>
          <label>Bio<textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Write your bio..." /></label>

          <div className="gender-section">
            <span>Gender:</span>
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g}><input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} /> {g}</label>
            ))}
          </div>

          <label>Country<input name="country" value={form.country} onChange={handleChange} list="countries" placeholder="Country" /></label>
          <datalist id="countries">{countrySuggestions.map(c => <option key={c} value={c} />)}</datalist>

          <div className="skills-section">
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillKey} list="skills" placeholder="Add skill" />
            <button onClick={addSkill}>Add</button>
            <datalist id="skills">{skillSuggestions.map(s => <option key={s} value={s} />)}</datalist>
            <div className="skill-tags">{skills.map(s => <span key={s}>{s} <button onClick={() => removeSkill(s)}>×</button></span>)}</div>
          </div>

          <div className="button-row">
            <button className="clear" onClick={clearForm}>Clear</button>
            <button className="submit" onClick={() => alert('Form submitted!')}>Submit</button>
          </div>
        </div>

        <div className="preview-section">
          <h2>Live Preview</h2>
          <div className="preview-card">
            <div className="avatar">{initials(form.name)}</div>
            <h3>{form.name || 'Your Name'}</h3>
            <p>{form.email || 'email@example.com'}</p>
            <p>{form.phone || 'Phone number'}</p>
            <p><strong>Bio:</strong> {form.bio || 'No bio yet'}</p>
            <p><strong>Gender:</strong> {form.gender || 'Not specified'}</p>
            <p><strong>Country:</strong> {form.country || 'Not specified'}</p>
            <div className="preview-skills">{skills.length ? skills.map(s => <span key={s}>{s}</span>) : <em>No skills added</em>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
