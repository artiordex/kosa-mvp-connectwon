
export default function InsightsHero() {
  return (
    <section 
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=modern%20workspace%20with%20person%20reading%20newspaper%20and%20laptop%2C%20business%20professional%20staying%20informed%20about%20industry%20trends%2C%20knowledge%20sharing%20and%20insights%2C%20clean%20minimalist%20office%20environment%2C%20natural%20lighting&width=1200&height=600&seq=insights-hero&orientation=landscape')`
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-white">
          <p className="text-lg font-medium mb-4 tracking-wider">INSIGHT</p>
          <h1 className="text-5xl font-bold mb-6">인사이트</h1>
        </div>
      </div>
    </section>
  );
}
