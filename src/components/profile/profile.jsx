import React from 'react';

function Profiles() {
  return (
    <div className="p-4">
      <h1 className="text-black text-3xl font-bold text-center mb-4">Profile</h1>
      <iframe
        src="/CHAMPION PROFILE.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=100&bgcolor=ffffff"
        className="w-full h-[85vh] border rounded-lg shadow-lg overflow-hidden"
        title="Champion Profile PDF"
        style={{ overflow: 'hidden' }}
      ></iframe>
    </div>
  );
}

export default Profiles;
