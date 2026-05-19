import { v4 as uuidv4 } from 'uuid';
class Cources{
  constructor() {
      this.cources =[] //array of obj coming from db
  }
  createCource(newCourse) {
    newCourse.id = uuidv4();
    courseWithSameName= this.cources.find(course => course.name === newCourse.name);
    if (courseWithSameName) {
      throw new Error('Course with the same name already exists');
    }
    this.cources.push(newCourse);
    return newCourse;
  }
  getAllCources() {
    return this.cources;
  }
  getCourceById(id) {
    return this.cources.find(course => course.id === id);
  }
}
export default Cources;