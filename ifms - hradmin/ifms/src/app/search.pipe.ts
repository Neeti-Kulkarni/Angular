import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users:any[], searchTerm: any): any {
     if(!searchTerm){
      return users;
     } 
     return users.filter((user:any) => {
      return user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
     })
  }

}
