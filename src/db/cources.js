import { v4 as uuidv4 } from 'uuid';
class Cources{
  constructor() {
      this.cources =[] //array of obj coming from db
  }
  createCource(newCourse) {
    newCourse.id = uuidv4();
    const courseWithSameName = this.cources.find(course => course.name === newCourse.name);
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
  removeCourseById(id) {
    const index = this.cources.findIndex(course => course.id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    this.cources.splice(index, 1);
  }
}
export default Cources;





















