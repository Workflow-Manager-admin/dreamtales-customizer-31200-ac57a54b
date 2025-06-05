import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * DreamTalesCustomizer is the main container for personalized bedtime story generation.
 * Allows user input for themes, characters, mood, and displays the generated story 
 * in a visually calming layout.
 */
function DreamTalesCustomizer() {
  // Default (simulated) user profile preferences; can be loaded from User Profile API
  const defaultProfile = {
    name: 'Dreamer',
    themes: ['adventure', 'magic'],
    favoriteCharacters: ['Luna the Owl', 'Finn the Fox'],
    mood: 'calm',
  };

  // Local state for preferences and generated story
  const [profile, setProfile] = useState(defaultProfile);
  const [form, setForm] = useState({
    themes: profile.themes.join(', '),
    favoriteCharacters: profile.favoriteCharacters.join(', '),
    mood: profile.mood,
  });
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle preferences "Save"
  const handleSavePreferences = (e) => {
    e.preventDefault();
    setProfile({
      ...profile,
      themes: form.themes.split(",").map((s) => s.trim()).filter(Boolean),
      favoriteCharacters: form.favoriteCharacters.split(",").map((s) => s.trim()).filter(Boolean),
      mood: form.mood,
    });
    setShowPrefs(false);
  };

  // Simulate AI-based story generation (replace with real API integration)
  const handleGenerateStory = async () => {
    setLoading(true);
    setStory('');
    // Placeholder for actual call to OpenAI/other backend
    setTimeout(() => {
      const themesText = profile.themes.length ? `themes of ${profile.themes.join(' and ')}` : '';
      const charsText = profile.favoriteCharacters.length ? `with characters like ${profile.favoriteCharacters.join(' and ')}` : '';
      const moodText = profile.mood ? `in a ${profile.mood} mood` : '';
      const base =
        `Once upon a time, in a land filled with ${themesText}, there lived ${charsText}. Every night, their adventures brought joy and comfort, especially ${profile.name}. Tonight, let's drift off to sleep as we journey through their magical world, ${moodText}...`;
      setStory(base);
      setLoading(false);
    }, 1400);
  };

  // OpenAI/Backend API integration hint (for future)
  // async function fetchStoryFromAPI(profilePrefs) {
  //   const resp = await fetch('/api/story', {...});
  //   const data = await resp.json();
  //   setStory(data.story);
  // }

  // UI colors from container context
  const colors = {
    primary: '#6C63FF',
    secondary: '#F8F8FF',
    accent: '#FFD166',
  };

  return (
    <div className="dreamtales-app-bg" style={{ minHeight: '100vh', background: colors.secondary }}>
      {/* NavBar */}
      <nav className="navbar" style={{ background: colors.primary }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: 'white' }}>
              <span className="logo-symbol" style={{ color: colors.accent, fontWeight: 900 }}>&#9737;</span>
              DreamTales Customizer
            </div>
            <button
              className="btn"
              style={{ backgroundColor: colors.accent, color: colors.primary }}
              onClick={() => setShowPrefs((v) => !v)}
              aria-label="Edit Preferences"
            >
              Preferences
            </button>
          </div>
        </div>
      </nav>

      {/* Main content container */}
      <main>
        <div className="container" style={{ maxWidth: 700, paddingTop: 120, paddingBottom: 64 }}>
          <div
            style={{
              background: 'white',
              borderRadius: 32,
              minHeight: 350,
              boxShadow: '0 12px 32px rgba(108,99,255,0.09), 0 1.5px 12px 2px rgba(52,52,122,0.07)',
              padding: 36,
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Story title & subtitle */}
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <div className="subtitle" style={{ color: colors.primary, fontWeight: 500, fontSize: 18 }}>
                Personalized Bedtime Story
              </div>
              <h1
                className="title"
                style={{
                  margin: 0,
                  fontSize: '2.2rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: colors.primary,
                  letterSpacing: '0.03em',
                }}
              >
                Goodnight Journey, {profile.name}!
              </h1>
              <div
                className="description"
                style={{
                  color: '#48357A',
                  fontSize: '1.1rem',
                  marginTop: 2,
                  marginBottom: 12,
                  opacity: 0.75,
                }}
              >
                Your story will appear below, uniquely tailored for you and your bedtime mood.
              </div>
            </div>

            {/* Generated Story Display */}
            <section
              style={{
                background: colors.secondary,
                borderRadius: '20px',
                minHeight: 120,
                padding: '32px 24px 28px 24px',
                fontFamily: 'serif',
                fontSize: '1.18rem',
                color: colors.primary,
                lineHeight: 1.6,
                textAlign: 'center',
                marginBottom: 20,
                transition: 'background 0.5s',
                boxShadow: '0 2px 14px 1px rgba(108,99,255,0.07)',
                border: `2px solid ${colors.primary}15`,
              }}
            >
              {loading ? (
                <div style={{ color: colors.primary }}>
                  <span className="loader" role="status" aria-label="Loading story..." />
                  Generating your calming tale...
                </div>
              ) : story ? (
                <span>{story}</span>
              ) : (
                <span style={{ fontStyle: 'italic', color: colors.primary + "88" }}>
                  Click &quot;Generate Story&quot; for a soothing bedtime adventure!
                </span>
              )}
            </section>

            {/* Generate Story */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
              <button
                className="btn btn-large"
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  borderRadius: '30px',
                  boxShadow: `0 1px 12px 0 ${colors.primary}22`,
                  fontSize: '1.08rem',
                  letterSpacing: '0.015em',
                  minWidth: 180,
                  transition: 'background 0.15s',
                  opacity: loading ? 0.65 : 1,
                  cursor: loading ? 'wait' : 'pointer',
                }}
                onClick={handleGenerateStory}
                disabled={loading}
              >
                {loading ? 'Please Wait...' : 'Generate Story'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Preferences Modal Drawer */}
      {showPrefs && (
        <div
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 200,
            background: `rgba(108,99,255,0.13)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.5s',
          }}
          onClick={() => setShowPrefs(false)}
        >
          <form
            aria-label="Edit preferences"
            style={{
              background: 'white',
              borderRadius: 28,
              minWidth: 340,
              maxWidth: 440,
              padding: '34px 32px 18px 32px',
              boxShadow: '0 5px 32px rgba(108,99,255,0.11), 0 1.5px 16px 2px rgba(52,52,122,0.10)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
            onSubmit={handleSavePreferences}
          >
            <h2 style={{ color: colors.primary, margin: '4px 0' }}>Preferences</h2>
            <label style={{ fontWeight: 500, color: '#48357A' }}>
              Name
              <input
                type="text"
                name="name"
                value={profile.name}
                readOnly
                disabled
                style={{
                  width: '100%',
                  marginTop: 0,
                  marginBottom: 8,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: `1px solid ${colors.primary}22`,
                  background: '#f3f0ff88',
                  color: '#463fa8',
                }}
              />
            </label>
            <label style={{ fontWeight: 500, color: '#48357A' }}>
              Themes <span style={{ fontWeight: 400, color: colors.primary, fontSize: '0.94em' }}>e.g. adventure, magic, animals</span>
              <input
                type="text"
                name="themes"
                value={form.themes}
                onChange={handleInputChange}
                placeholder="adventure, magic, animals"
                style={{
                  width: '100%',
                  marginTop: 0,
                  marginBottom: 8,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: `1px solid ${colors.primary}22`,
                  background: '#fcfbff',
                  color: colors.primary,
                }}
              />
            </label>
            <label style={{ fontWeight: 500, color: '#48357A' }}>
              Favorite Characters <span style={{ fontWeight: 400, color: colors.primary, fontSize: '0.94em' }}>comma separated</span>
              <input
                type="text"
                name="favoriteCharacters"
                value={form.favoriteCharacters}
                onChange={handleInputChange}
                placeholder="Luna the Owl, Finn the Fox"
                style={{
                  width: '100%',
                  marginTop: 0,
                  marginBottom: 8,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: `1px solid ${colors.primary}22`,
                  background: '#fcfbff',
                  color: colors.primary,
                }}
              />
            </label>
            <label style={{ fontWeight: 500, color: '#48357A' }}>
              Mood & tone
              <select
                name="mood"
                value={form.mood}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  marginTop: 0,
                  marginBottom: 12,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: `1px solid ${colors.primary}22`,
                  background: '#fcfbff',
                  color: colors.primary,
                }}
              >
                <option value="calm">Calm</option>
                <option value="adventurous">Adventurous</option>
                <option value="silly">Silly</option>
                <option value="warm">Warm</option>
                <option value="mysterious">Mysterious</option>
                <option value="uplifting">Uplifting</option>
                <option value="surprising">Surprising</option>
              </select>
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: '#ececff', color: colors.primary, borderRadius: '13px', padding: '7px 18px' }}
                onClick={() => setShowPrefs(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: colors.primary, color: 'white', borderRadius: '15px', padding: '7px 18px' }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loader Style */}
      <style>
        {`
        .loader {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid ${colors.accent};
          border-top: 3px solid ${colors.primary};
          border-radius: 50%;
          animation: dt-spin 0.9s linear infinite;
          margin-right: 14px;
          vertical-align: middle;
        }
        @keyframes dt-spin { 
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Main app component that renders the DreamTalesCustomizer container.
 */
function App() {
  return (
    <DreamTalesCustomizer />
  );
}

export default App;
