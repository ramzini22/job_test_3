import { DeleteResult, ObjectID, Repository } from "typeorm";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ObjectUtils } from "../utils/object.utils";

export class CustomBaseRepository<ENTITY, PUBLIC_TYPE = unknown> extends Repository<ENTITY> {
  public readonly ALIAS;

  getSelectQueryBuilder(): SelectQueryBuilder<ENTITY> {
    return this.createQueryBuilder(this.ALIAS);
  }

  getAlias() {
    return this.ALIAS;
  }

  delete<DELETE_TYPE = PUBLIC_TYPE>(
    criteria: CriteriaTypeORMType<ENTITY> | DELETE_TYPE,
  ): Promise<DeleteResult> {
    return super.delete(criteria as CriteriaTypeORMType<ENTITY>);
  }

  update<UPDATE_TYPE = PUBLIC_TYPE>(
    criteria: CriteriaTypeORMType<ENTITY> | UPDATE_TYPE,
    partialEntity: QueryDeepPartialEntity<ENTITY> | UPDATE_TYPE,
  ): Promise<UpdateResult> {
    return super.update(
      criteria as CriteriaTypeORMType<ENTITY>,
      partialEntity as QueryDeepPartialEntity<ENTITY>,
    );
  }

  findOne<SELECT_TYPE = PUBLIC_TYPE>(criteria: SELECT_TYPE): Promise<ENTITY> {
    return super.findOne(criteria as FindConditions<SELECT_TYPE>);
  }

  /**
   * Change update  params
   * Delete undefined
   * @param {CriteriaTypeORMType<ENTITY> | UPDATE_TYPE} criteria
   * @param {QueryDeepPartialEntity<ENTITY> | UPDATE_TYPE} partialEntity
   * @return {Promise<UpdateResult>}
   */
  updateOnlyDefinedValues<UPDATE_TYPE = PUBLIC_TYPE>(
    criteria: CriteriaTypeORMType<ENTITY> | UPDATE_TYPE,
    partialEntity: QueryDeepPartialEntity<ENTITY> | UPDATE_TYPE,
  ): Promise<UpdateResult> {
    const definedPartialEntity = ObjectUtils.removeUndefinedValues(
      partialEntity as QueryDeepPartialEntity<ENTITY>,
    );
    if (Object.keys(definedPartialEntity).length === 0) return;
    return super.update(criteria as CriteriaTypeORMType<ENTITY>, definedPartialEntity);
  }
}

export type CriteriaTypeORMType<ENTITY> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectID
  | ObjectID[]
  | FindConditions<ENTITY>;
