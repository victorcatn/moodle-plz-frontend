import {SkillScore} from "../skill/SkillScore";
import {KnowledgeScore} from "../knowledge/KnowledgeScore";

export class Project{
  id:String;
  name:String;
  startDate:Date;
  endDate:Date;

  neededSkills:SkillScore[];
  neededKnowledges:KnowledgeScore[];

  assignedGroupId:String;
}
