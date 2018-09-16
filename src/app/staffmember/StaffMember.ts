import {SkillScore} from "../skill/SkillScore";
import {KnowledgeScore} from "../knowledge/KnowledgeScore";

export class StaffMember{  
  id:String;
  document:String;
  email:String;
  password:String;
  name:String;
  lastName:String;

  isHumanResourcesManager:Boolean; //TODO: separate classes for HRM and staff member

  skills:SkillScore[];
  knowledges:KnowledgeScore[];
}
