import { Route } from '@angular/router';
import { FeatureClassroomComponent } from '@qisapp/classroom/feature-classroom';
import { FeatureLessonComponent } from '@qisapp/classroom/feature-lesson';
import { FeatureLessonsComponent } from '@qisapp/classroom/feature-lessons';


export const remoteRoutes: Route[] = [
  { path: '', component: FeatureClassroomComponent },
  { path: 'lessons', component: FeatureLessonsComponent },
  { path: 'lessons/:id', component: FeatureLessonComponent },

];
