import { useEffect, useState } from 'react';
import { IoAddOutline, IoCloseOutline, IoPencilOutline, IoSaveOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Skleton, Title } from '../../components';
import { OpportunitiesModal } from '../../components/specific-modals/opportunitiesForm/OpportunitiesModal';
import { Opportunity } from '../../interfaces/Opportunity.interface';
import { getLoading, getOpportunities } from '../../store/opportunities/opportunitiesSlice';
import {
  deleteOportunity,
  getAllOpportunities,
  updateOportinity
} from '../../store/opportunities/opportunitiesThunk';
import { AppDispatch } from '../../store/store';
import './opportunity.scss';

export const OpportunitiesPage = () => {
  const opportunities = useSelector(getOpportunities);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(getLoading);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [opportunityToEdit, setOpportunityToEdit] = useState<Opportunity | null>(null);

  const onDelete = async (id: number) => {
    await dispatch(deleteOportunity(id));
  };
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const opportunitiesFiltered = searchOpportunities(opportunities, search);

  const handleEditClick = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setOpportunityToEdit(prevState => {
      if (!prevState) return null;
      return { ...prevState, [name]: value };
    });
  };

  const handleSave = async () => {
    const oportunittieId = opportunityToEdit!.id;
    const opportunity = opportunityToEdit;
    if (!opportunity) return;
    setOpportunityToEdit(null);
    await dispatch(updateOportinity({ oportunittieId, opportunity }));
  };
  const handleCancel = () => {
    setIsEditing(!isEditing);
    setOpportunityToEdit(null);
  };

  useEffect(() => {
    dispatch(getAllOpportunities());
  }, [dispatch]);

  return (
    <section className="opportunities section">
      <Title title="Oportunidades" />

      {loading === 'loading' ? (
        <Skleton />
      ) : (
        <>
          <div className="opportunities__header">
            <InputSearch onSearch={onSearch} placeHolder="Buscar por nombre..." />

            <button className="button" onClick={() => setIsModalOpen(!isModalOpen)}>
              <IoAddOutline size={20} /> Añadir oportunidad
            </button>
          </div>

          <table className="table">
            <thead className="table__head">
              <tr>
                <th className="table__th">Nombre</th>
                <th>Titulo</th>
                <th>Description</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {opportunitiesFiltered.map(opportunity => (
                <tr key={opportunity.id} className="table__row">
                  <td className="table__data--name">
                    {opportunityToEdit?.id === opportunity.id ? (
                      <input type="text" name="name" value={opportunityToEdit.name} onChange={handleEditClick} />
                    ) : (
                      opportunity.name
                    )}
                  </td>
                  <td className="table__data--name">
                    {opportunityToEdit?.id === opportunity.id ? (
                      <input type="text" name="title" value={opportunityToEdit.title} onChange={handleEditClick} />
                    ) : (
                      opportunity.title
                    )}
                  </td>
                  <td className="table__data--name">
                    {opportunityToEdit?.id === opportunity.id ? (
                      <input
                        type="text"
                        name="description"
                        value={opportunityToEdit.description}
                        onChange={handleEditClick}
                      />
                    ) : (
                      opportunity.description
                    )}
                  </td>

                  <td className="table__data">
                    {opportunityToEdit?.id === opportunity.id ? (
                      <select value={opportunityToEdit.status} name="status" onChange={handleEditClick}>
                        <option value="new">new</option>
                        <option value="inProgress">inProgress</option>
                        <option value="closed">closed</option>
                      </select>
                    ) : (
                      opportunity.status
                    )}
                  </td>
                  <td className="table__data table__data--actions">
                    {opportunityToEdit?.id === opportunity.id ? (
                      <>
                        <IoSaveOutline onClick={handleSave} role="button" tabIndex={0} />
                        <IoCloseOutline onClick={handleCancel} role="button" tabIndex={0} />
                      </>
                    ) : (
                      <>
                        <IoPencilOutline
                          onClick={() => {
                            setIsEditing(!isEditing);
                            setOpportunityToEdit(opportunity);
                          }}
                        />

                        <IoTrashBinOutline onClick={() => onDelete(opportunity.id)} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OpportunitiesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} />
          {!opportunitiesFiltered.length && <span>No se encontraron resultados 😅</span>}
        </>
      )}
    </section>
  );
};

const searchOpportunities = (opportunities: Opportunity[], search: string) => {
  if (!search) return opportunities;
  const searchLower = search.toLowerCase();

  const oportunitiesdFiltered = opportunities.filter(opportunity =>
    opportunity.name.toLowerCase().includes(searchLower)
  );

  return oportunitiesdFiltered;
};
