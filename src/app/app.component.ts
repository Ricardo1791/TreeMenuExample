import { Component, ViewChild } from '@angular/core';
import { IActionMapping, ITreeOptions, TreeNode, TREE_ACTIONS } from '@circlon/angular-tree-component';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        if (node.hasChildren) {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }else{
          console.log(node.data.url);
        }
      },
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
        this.onContextMenu($event, node.data);
      }
    }
}

  title = 'ng-tree';

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1', url: 'hola1' },
        { id: 3, name: 'child2', url: 'hola2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1', url: 'hola2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub', url: 'hola2.2' }
          ]
        }
      ]
    }
  ];
  options: ITreeOptions = { actionMapping: this.actionMapping };

  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];

  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;


  constructor(private contextMenuService: ContextMenuService){}

  public onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({
      // Optional - if unspecified, all context menu components will open
      contextMenu: this.basicMenu,
      event: $event,
      item: item,
    });

    $event.preventDefault();
    $event.stopPropagation();
  }

  showMessage(message: any) {
    console.log(message);
  }
}
