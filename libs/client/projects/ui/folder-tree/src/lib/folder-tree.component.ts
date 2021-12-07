import {Component, Input} from '@angular/core';
import { ProjectFolder } from 'nx-cli-osfn/lib/projects/models/folder-tree.model';

@Component({
  selector: 'nx-cli-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss'],
})
export class FolderTreeComponent {
  @Input() folderTree: ProjectFolder;
}
