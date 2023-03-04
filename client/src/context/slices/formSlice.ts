import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProject {
  id: number;
  name: string;
  description: string;
  role: string;
  period: string;
  responsibilities: string;
  tools: string;
  [key: string]: string | number;
}

interface ISkill {
  id: number;
  name: string;
  description: string;
  [key: string]: string | number;
}

interface IProfessionalTool {
  id: number;
  skillId: number;
  name: string;
  experience: string;
  lastUsed: string;
  [key: string]: string | number;
}

interface IProfessionalSkill {
  id: number;
  sectionName: string;
  [key: string]: unknown;
}

interface State {
  currentStep: number;
  name: string;
  position: string;
  education: string;
  languageProficiency: string[];
  domains: string[];
  projects: IProject[];
  skills: ISkill[];
  mainPageTitle: string;
  mainPageExperience: string;
  professionalTools: IProfessionalTool[];
  professionalSkills: IProfessionalSkill[];
}

const initialState: State = {
  currentStep: 0,
  name: 'Anakin Skywalker',
  position: 'QA Engineer',
  education: 'Higher Education in Computer Science and Software Engineering',
  languageProficiency: [],
  domains: [],
  projects: [{ id: 1, name: '', description: '', role: '', period: '', responsibilities: '', tools: '' }],
  skills: [{ id: 1, name: '', description: '' }],
  mainPageTitle: 'QA Engineer with 5 years of experience.',
  mainPageExperience: 'Highly skilled and motivated QA specialist with 5 years of experience in commercial projects.',
  professionalTools: [{ id: 1, skillId: 1, name: '', experience: '', lastUsed: '' }],
  professionalSkills: [{ id: 1, sectionName: '' }]
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setEducation: (state, action: PayloadAction<string>) => {
      state.education = action.payload;
    },
    setLanguageProficiency: (state, action: PayloadAction<string>) => {
      state.languageProficiency = action.payload.split(',').map(item => item.trim());
    },
    setDomains: (state, action: PayloadAction<string>) => {
      state.domains = action.payload.split(',').map(item => item.trim());
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<{ id: number }>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload.id);
    },
    updateProject: (state, action) => {
      const { id, field, value } = action.payload;
      const projectToUpdate = state.projects.find(project => project.id === id);
      if (projectToUpdate) {
        projectToUpdate[field] = value;
      }
    },
    addSkill: (state, action: PayloadAction<ISkill>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<{ id: number }>) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload.id);
    },
    updateSkill: (state, action) => {
      const { id, field, value } = action.payload;
      const skillToUpdate = state.skills.find(skill => skill.id === id);
      if (skillToUpdate) {
        skillToUpdate[field] = value;
      }
    },
    addProfessionalTool: (state, action) => {
      state.professionalTools.push(action.payload);
    },
    removeProfessionalTool: (state, action: PayloadAction<{ id: number }>) => {
      state.professionalTools = state.professionalTools.filter(skill => skill.id !== action.payload.id);
    },
    updateProfessionalTool: (state, action) => {
      const { id, field, value } = action.payload;
      const professionalToolToUpdate = state.professionalTools.find(skill => skill.id === id);
      if (professionalToolToUpdate) {
        professionalToolToUpdate[field] = value;
      }
    },
    addProfessionalSkill: (state, action: PayloadAction<IProfessionalSkill>) => {
      state.professionalSkills.push(action.payload);
    },
    removeProfessionalSkill: (state, action: PayloadAction<{ id: number }>) => {
      state.professionalSkills = state.professionalSkills.filter(skill => skill.id !== action.payload.id);
    },
    updateProfessionalSkill: (state, action) => {
      const { id, field, value } = action.payload;
      const professionalSkillToUpdate = state.professionalSkills.find(skill => skill.id === id);
      if (professionalSkillToUpdate) {
        professionalSkillToUpdate[field] = value;
      }
    },
    setMainPageTitle: (state, action: PayloadAction<string>) => {
      state.mainPageTitle = action.payload;
    },
    setMainPageExperience: (state, action: PayloadAction<string>) => {
      state.mainPageExperience = action.payload;
    }
  }
});

export const {
  setCurrentStep,
  setName,
  setPosition,
  setEducation,
  setLanguageProficiency,
  setDomains,
  setMainPageTitle,
  setMainPageExperience,
  addProject,
  removeProject,
  updateProject,
  addSkill,
  removeSkill,
  updateSkill,
  addProfessionalSkill,
  removeProfessionalSkill,
  updateProfessionalSkill,
  addProfessionalTool,
  removeProfessionalTool,
  updateProfessionalTool
} = formSlice.actions;
export const formState = (state: RootState) => state.form;

export default formSlice.reducer;
