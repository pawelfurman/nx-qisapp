import { Route } from '@angular/router';
import { FeatureClassroomComponent } from '@qisapp/classroom/feature-classroom';
import { FeatureLessonComponent } from '@qisapp/classroom/feature-lesson';


export const remoteRoutes: Route[] = [
  { path: '', component: FeatureClassroomComponent },
  { path: 'lessons/:id', component: FeatureLessonComponent },

];
