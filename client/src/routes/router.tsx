import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Personal } from '../pages/Personal';
import { Tools } from '../pages/Tools';
import { Concluded } from '../pages/Concluded';
import { AboutMe } from '../pages/AboutMe';
import { Projects } from '../pages/Projects';
import { Upload } from '../pages/Upload';

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Personal />} />
        <Route path="/step2" element={<AboutMe />} />
        <Route path="/step3" element={<Projects />} />
        <Route path="/step4" element={<Tools />} />
        <Route path="/step5" element={<Upload />} />
        <Route path="/step6" element={<Concluded />} />
      </Routes>
    </BrowserRouter>
  );
};
