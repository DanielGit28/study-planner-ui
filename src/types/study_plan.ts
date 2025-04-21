export interface StudyPlanResponse {
    study_plan: StudyPlanItem[];
  }
  
  export interface StudyPlanItem {
    task: string;
    mode: "Teórico" | "Práctico" | "Creativo";
    plan: Plan;
  }
  
  export interface Plan {
    actividades: Actividad[];
  }
  
  export interface Actividad {
    tipo: string;
    descripcion: string;
    tiempo_estimado: string;
    recursos: Recurso[];
  }
  
  export interface Recurso {
    titulo: string;
    autor?: string;
    link: string;
  }
  