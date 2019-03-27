import {ConfigObject} from '../configobject.model';
import {RoleMappingProto} from '../../../../api';

export enum Role {
  ANY_USER,
  ANY,
  ADMIN,
  CURATOR,
  READONLY,
  OPERATOR,
  SYSTEM,
}

export class RoleMapping {
  email?: string;
  group?: string;
  roleList: Role[];

  constructor({
                email = '',
                group = '',
                roleList = []
              } = {}) {
    this.email = email;
    this.group = group;
    this.roleList = roleList;
  }

  static fromProto(proto: RoleMappingProto): RoleMapping {
    return new RoleMapping({
      email: proto.getEmail(),
      group: proto.getGroup(),
      roleList: proto.getRoleList()
    });
  }

  static toProto(roleMapping: RoleMapping): RoleMappingProto {
    const proto = new RoleMappingProto();
    if (roleMapping.email !== null) {
      proto.setEmail(roleMapping.email);
    }
    if (roleMapping.group !== null) {
      proto.setGroup(roleMapping.group);
    }
    proto.setRoleList(roleMapping.roleList);

    return proto;
  }

  static mergeConfigs(configObjects: ConfigObject[]): RoleMapping {
    const roleMapping = new RoleMapping();

    const commonRoles = getCommonRoles(configObjects);


    for (const role of commonRoles) {
      const gotRole = configObjects.every(function (cfg) {
        return cfg.roleMapping.roleList.indexOf(role) !== -1;
      });

      if (gotRole) {
        roleMapping.roleList.push(role);
      }
    }
    return roleMapping;
  }
}

function getCommonRoles(configObjects: ConfigObject[]): any {
  const allRoles = [];
  for (const cfg of configObjects) {
    if (cfg.roleMapping.roleList !== undefined) {
      for (const role of cfg.roleMapping.roleList) {
        if (role !== undefined) {
          allRoles.push(role);
        }
      }
    }
  }
  const unique = allRoles.filter(function (item, pos, self) {
    return self.indexOf(item) === pos;
  });
  return unique;
}

export class RoleList {
  role: string[];
}
